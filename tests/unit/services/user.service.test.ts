import { HttpStatusCode } from "../../../src/common/types";
import { User } from "../../../src/models";
import { UserService } from "../../../src/services";
import { HttpError } from "../../../src/utils";

jest.mock("../../../src/models");
const mockedUserFindFirst = User.findFirst as jest.MockedFunction<typeof User.findFirst>;
let userService = new UserService(User);

describe('User Service', () => {
  afterEach(() => {
    userService = new UserService(User);
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

      const result = await userService.getUserByUsername(username);

      expect(mockedUserFindFirst).toHaveBeenCalledWith({
        where: {
          username: username,
        },
      });

      expect(result).toEqual(mockUser);
    });

    it('should throw an error when username does not exist', async () => {
      const username = 'unknownuser';

      mockedUserFindFirst.mockResolvedValue(null);

      await expect(userService.getUserByUsername(username)).rejects.toThrow(
          new HttpError(HttpStatusCode.NotFound, 'User not found')
        );
    
      expect(mockedUserFindFirst).toHaveBeenCalledWith({
        where: {
          username: username,
        },
      });
  });
  });
});
