'use strict';
// routes/payments.js

const router = require('express').Router();
const { charges, idempotency, nextChargeId } = require('../store');

router.post('/', (req, res) => {
  // Get the Idempotency-Key from request headers
  const key = req.headers['idempotency-key'];

  // Rule 1: Check if key is missing
  if (!key) {
    return res.status(400).json({
      error: {
        code: 'IDEMPOTENCY_KEY_REQUIRED',
        message: 'Idempotency-Key header is required'
      }
    });
  }

  // Rule 2: Check if this key was already used
  if (idempotency.has(key)) {
    const storedResponse = idempotency.get(key);

    return res.status(storedResponse.status).json(storedResponse.body);
  }

  // Rule 3: Create a new charge
  const amount = req.body && req.body.amount;

  const charge = {
    id: nextChargeId(),
    amount,
    status: 'charged'
  };

  // Add the real charge
  charges.push(charge);

  // Store the response for future requests
  const body = {
    id: charge.id,
    amount: charge.amount,
    status: charge.status
  };

  idempotency.set(key, {
    status: 201,
    body
  });

  return res.status(201).json(body);
});

module.exports = router;