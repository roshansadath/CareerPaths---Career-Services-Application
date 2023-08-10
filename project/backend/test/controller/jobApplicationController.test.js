const {
    getAllJobApplications,
    getJobApplication,
    createJobApplication,
    updateJobApplication,
    deleteJobApplication
} = require('../../controllers/jobApplicationController');
const JobApplication = require('../../model/jobApplications');
const JobPost = require('../../model/jobPost');
const User = require('../../model/user');
const bcrypt = require("bcrypt");

const mockResponse = () => {
    const res = {};
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
};

describe('jobApplicationController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Mock job application data for testing
    const mockJobApplications = [
        {
            applicationId: 1,
            applied_date: new Date('2023-07-31'),
            status: 'Pending',
            postId: 1,
            userId: 1,
        },
        {
            applicationId: 2,
            applied_date: new Date('2023-08-01'),
            status: 'Accepted',
            postId: 2,
            userId: 2,
        },
        // Add more mock job application data as needed
    ];

    // Mock user data for testing
    const mockUsers = [
        {
            userId: 1,
            name: 'John Doe',
            email: 'john@example.com',
            username: 'johndoe',
            password: bcrypt.hashSync('password123', 10),
            userType: 'employer',
            cvUrl: 'https://example.com/cv/johndoe',
        },
        {
            userId: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            username: 'janesmith',
            password: bcrypt.hashSync('password456', 10),
            userType: 'applicant',
            cvUrl: 'https://example.com/cv/janesmith',
        },
        // Add more mock user data as needed
    ];

    // Mock job post data for testing
    const mockJobPosts = [
        {
            postId: 1,
            job_designation: 'Software Engineer',
            job_description: 'Job description for Software Engineer',
            location: 'New York',
            posted_date: new Date('2023-07-30'),
            status: 'Open',
            name_of_the_team: 'Engineering Team',
            pay_range: '$80,000 - $100,000',
            posted_by_userId: 1,
        },
        {
            postId: 2,
            job_designation: 'Product Manager',
            job_description: 'Job description for Product Manager',
            location: 'San Francisco',
            posted_date: new Date('2023-08-01'),
            status: 'Open',
            name_of_the_team: 'Product Team',
            pay_range: '$90,000 - $120,000',
            posted_by_userId: 1,
        },
        // Add more mock job post data as needed
    ];

    describe('getAllJobApplications', () => {
        it('should retrieve all job applications', async () => {
            JobApplication.findAll = jest.fn().mockResolvedValue([]);

            const req = {};
            const res = mockResponse();

            await getAllJobApplications(req, res);

            expect(JobApplication.findAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith([]);
        });

    });

    describe('getJobApplication', () => {
        it('should retrieve a specific job application by id', async () => {
            JobApplication.findByPk = jest.fn().mockResolvedValue({});

            const req = { params: { id: 1 } };
            const res = mockResponse();

            await getJobApplication(req, res);

            expect(JobApplication.findByPk).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith({});
        });

    });


    describe('updateJobApplication', () => {
        it('should update an existing job application', async () => {
            const mockJobApplication = {
                // Provide mock data for an existing job application
            };
            JobApplication.findByPk = jest.fn().mockResolvedValue(mockJobApplication);
            mockJobApplication.save = jest.fn().mockResolvedValue(mockJobApplication);

            const req = {
                params: { id: 1 },
                body: {
                    // Provide necessary data for updating a job application
                }
            };
            const res = mockResponse();

            await updateJobApplication(req, res);

            expect(JobApplication.findByPk).toHaveBeenCalledWith(1);
            expect(mockJobApplication.save).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockJobApplication);
        });

    });


    describe('deleteJobApplication', () => {
        it('should delete an existing job application', async () => {
            const mockJobApplication = {
                destroy: jest.fn()
            };
            JobApplication.findByPk = jest.fn().mockResolvedValue(mockJobApplication);

            const req = {
                params: { id: 1 }
            };
            const res = mockResponse();

            await deleteJobApplication(req, res);

            expect(JobApplication.findByPk).toHaveBeenCalledWith(1);
            expect(mockJobApplication.destroy).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ message: 'Job Application Deleted Successfully.' });
        });

    });

});
