import { User } from "../../../src/models";
import { UserService } from "../../../src/services";

jest.mock("../../../src/models");
const mockedUserFindFirst = User.findFirst as jest.MockedFunction<typeof User.findFirst>;

describe('User Service', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  describe('getUserByUsername', () => {
    it('should return user if found', async () => {
      const username = 'testuser';
      const mockUser = {
        username: 'testuser',
        name: 'Test User',
        password: 'hashedpassword', 
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockedUserFindFirst.mockResolvedValue(mockUser);

      const result = await UserService.getUserByUsername(username);

      expect(mockedUserFindFirst).toHaveBeenCalledWith({
        where: {
          username: username,
        },
      });

      expect(result).toEqual(mockUser);
    });

    it('should return null if user not found', async () => {
      const username = 'unknownuser';

      mockedUserFindFirst.mockResolvedValue(null);

      const result = await UserService.getUserByUsername(username);

      expect(mockedUserFindFirst).toHaveBeenCalledWith({
        where: {
          username: username,
        },
      });

      expect(result).toBeNull();
    });
  });
});
