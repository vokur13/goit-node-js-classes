const { getPostsByID } = require('../src/services/postsService');
const { Post } = require('../src/model/postsModel');

describe('PostsService getPostsByID Test', () => {
  it('Should return Post data by ID', async () => {
    const mPostId = 'nbnrkjnbrkjn';
    const mUserId = 'dfjknbjd';

    const post = {
      _id: mPostId,
      title: 'title',
      content: 'content',
      owner: mUserId,
    };
    jest.spyOn(Post, 'findOne').mockImplementationOnce(async () => post);

    const result = await getPostsByID(mPostId, mUserId);

    expect(result._id).toBe(mPostId);
    expect(result.owner).toBe(mUserId);
    expect(result.title).toBeDefined();
    expect(result.content).toBeDefined();
  });
});
