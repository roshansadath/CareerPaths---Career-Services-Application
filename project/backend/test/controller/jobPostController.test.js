const { getAllJobPosts, getUserJobPost, getJobPost, createJobPost, updateJobPost, deleteJobPost } = require('../../controllers/jobPostController'); // Updated path to jobController.js
const JobPost = require('../../model/jobPost'); // Updated path to jobPost model

// Mock the JobPost model for testing
jest.mock('../../model/jobPost', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
}));

describe('jobController', () => { // Updated describe block title
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test for getAllJobPosts function
  it('should get all job posts', async () => {
    const mockJobPosts = [{ id: 1, job_designation: 'Job 1' }, { id: 2, job_designation: 'Job 2' }];
    JobPost.findAll.mockResolvedValueOnce(mockJobPosts);

    const req = {};
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    await getAllJobPosts(req, res, next);

    expect(res.json).toHaveBeenCalledWith(mockJobPosts);
  });

  // Test for getUserJobPost function
  it('should get job posts for a specific user', async () => {
    const mockJobPosts = [{ id: 1, job_designation: 'Job 1', posted_by_userId: 1 }];
    JobPost.findAll.mockResolvedValueOnce(mockJobPosts);

    const req = {
      user: {
        userId: 1,
      },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    await getUserJobPost(req, res, next);

    expect(res.json).toHaveBeenCalledWith(mockJobPosts);
  });

  // Test for getJobPost function
  it('should get a specific job post by ID', async () => {
    const mockJobPost = { id: 1, job_designation: 'Job 1' };
    JobPost.findByPk.mockResolvedValueOnce(mockJobPost);

    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };
    const next = jest.fn();

    await getJobPost(req, res, next);

    expect(res.json).toHaveBeenCalledWith(mockJobPost);
  });

  // Test for createJobPost function
  it('should create a new job post', async () => {
    const mockNewJobPost = { id: 1, job_designation: 'New Job' };
    JobPost.create.mockResolvedValueOnce(mockNewJobPost);

    const req = {
      body: {
        job_designation: 'New Job',
        // Add other required properties in the request body for a new job post
      },
      user: {
        userId: 1,
      },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    await createJobPost(req, res, next);

    expect(res.json).toHaveBeenCalledWith(mockNewJobPost);
  });

  // Test for updateJobPost function
  it('should update an existing job post', async () => {
    const mockExistingJobPost = { id: 1, job_designation: 'Job 1' };
    JobPost.findByPk.mockResolvedValueOnce(mockExistingJobPost);

    const req = {
      params: {
        id: 1,
      },
      body: {
        job_designation: 'Updated Job',
        // Add other properties to update in the request body
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res), // Add status method mock
    };
    const next = jest.fn();

    await updateJobPost(req, res, next);

    // Assert that the job post is updated
    expect(mockExistingJobPost.job_designation).toBe('Updated Job');
    // Add other expect statements for other properties that you update
  });

  // Test for deleteJobPost function
  it('should delete a job post', async () => {
    const mockPostId = 1;
    const mockJobPost = { postId: mockPostId, job_designation: 'Job 1' };
    JobPost.findByPk.mockResolvedValueOnce(mockJobPost);
    // Mock the destroy method to resolve successfully
    mockJobPost.destroy = jest.fn().mockResolvedValueOnce();
  
    const req = {
      params: {
        id: mockPostId,
      },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();
  
    await deleteJobPost(req, res, next);
  
    expect(res.json).toHaveBeenCalledWith({ message: 'Job Post Deleted Successfully.' });
  });
});
