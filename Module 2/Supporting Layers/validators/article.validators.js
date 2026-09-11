

const createArticle =[
    body('title').notEmpty().withMessage('Title is required').trim(),
    body('body').notEmpty().isLength({ max: 2000}).withMessage('Body is required and must be under')
];


body('title').optional().notEmpty().body
body('body').optional().isLength({max: 2000})
];

module.export ={
    createArticle
    updateArticle
}