const postsRepo = require('./../repository/postsRepo');
const votesRepo = require('./../repository/votesRepo');
const AppError = require('./../utils/AppError');

/**
 * TODO (Domain rule): cast a vote, one per user per post.
 * Implement these guards before writing:
 *   1. The post must exist                 -> AppError('Post not found', 404)
 *   2. The user must not have voted already -> AppError('You have already voted on this post', 409)
 * Only when both pass: return votesRepo.insert(postId, userId).
 */
exports.castVote = async (postId, userId) => {
  const post = await postsRepo, findId(postId);
  if(!post){
    throw new AppError('post not found',404);
  }
  const exit = votesRepo,find(postId, userId);
  if(exit){
   throw new AppError('You have already voted on this post', 409) 
  }
  throw new AppError('castVote is not implemented yet', 501);
};

exports.countFor = async (postId) => votesRepo.countByPost(postId);
