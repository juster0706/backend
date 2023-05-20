const UserService = require("../../../services/users.service");

let mockUserRepository = {
  findNickname: jest.fn(),
  findEmail: jest.fn(),
  signup: jest.fn(),
  deleteSignup: jest.fn(),
  login: jest.fn(),
  saveToken: jest.fn(),
  logout: jest.fn(),
};

let userService = new UserService();
// userService의 Repository를 Mock Repository로 변경
userService.userRepository = mockUserRepository;

describe("User Service Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화
  });

  test("회원가입 메서드", async () => {
    // signup Method를 실행했을 때, Return 값
    const signupReturnValue = {
      user_id: 1,
      nickname: "Nickname_1",
      email: "Email_1",
      location: "Location_1",
      profile_image: expect.anything(),
      introduction: expect.anything(),
      createdAt: expect.anything(),
      updatedAt: expect.anything(),
    };

    // signup method를 실행하기 위해 필요한 params
    const signupParams = {
      nickname: "signupNickname",
      password: "signupPassword",
      email: "signupEmail",
      location: "signupLocation",
      profile_image: expect.anything(),
      introduction: expect.anything(),
    };

    // Repository의 signup Method를 Mocking하고,
    // signupReturnValue를 Return 값으로 변경한다.
    mockUserRepository.signup = jest.fn(() => {
      return signupReturnValue;
    });

    // UserService의 signup Method를 실행한다.
    const signupData = await userService.signup(
      signupParams.nickname,
      signupParams.password,
      signupParams.email,
      signupParams.location,
      signupParams.profile_image,
      signupParams.introduction
    );

    // UserRepository의 signup Method가 1번 호출되었는지 검증
    expect(mockUserRepository.signup).toHaveBeenCalledTimes(1);
    // signup Method의 Return 값과
    // userService의 signup Method 실행했을 때 Return 값과 일치하는지 검증
    expect(signupData).toEqual(signupReturnValue);
  });
});
