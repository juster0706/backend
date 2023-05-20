const UserRepository = require("../../../repositories/users.repository");

// users.repository.js 에서 3개 Method만 사용
let mockUsersModel = {
  findOne: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
};

let userRepository = new UserRepository(mockUsersModel);

describe("User Repository Unit Test", () => {
  // 각 test가 실행되기 전 실행된다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock 초기화
  });
  test("중복된 닉네임 찾는 메서드", async () => {
    // findOne Mock의 Return 값을 "existNickname"으로 설정한다.
    mockUsersModel.findOne = jest.fn(() => {
      return "existNickname";
    });
    // 중복된 닉네임을 찾기 위한 Params
    const findNicknameParams = { nickname: "existNickname" };

    // userRepository의 findOne Method를 실행
    const existNickname = await userRepository.findNickname(
      findNicknameParams.nickname
    );

    // mockUsersModel의 Return과 출력된 findOne Method의 값이 일치하는지 비교
    expect(existNickname).toBe("existNickname");

    // userRepository의 findNickname Method를 실행했을 때,
    // usersModel의 findOne을 1번 실행
    expect(mockUsersModel.findOne).toHaveBeenCalledTimes(1);
  });

  test("회원 가입 메서드", async () => {
    // create mock의 Return 값을 'create signup'으로 설정
    mockUsersModel.create = jest.fn(() => {
      return "create signup";
    });

    // signup method를 실행하기 위해 필요한 params
    const signupParams = {
      nickname: "signupNickname",
      password: "signupPassword",
      email: "signupEmail",
      location: "signupLocation",
      profile_image: expect.anything(),
      introduction: expect.anything(),
    };

    // userRepository의 signup method를 실행
    const signupData = await userRepository.signup(
      signupParams.nickname,
      signupParams.password,
      signupParams.email,
      signupParams.location,
      signupParams.profile_image,
      signupParams.introduction
    );

    // signupData는 usersModel의 create를 실행한 결과값과
    // create mock의 return 값과 같은지 테스트
    expect(signupData).toBe("create signup");

    // userRepository의 signup method를 실행했을 때,
    // usersModel의 create를 1번 실행
    expect(mockUsersModel.create).toHaveBeenCalledTimes(1);

    // userRepository의 signup method를 실행했을 때,
    // userModel의 create를 아래와 같은 값으로 호출한다.
    expect(mockUsersModel.create).toHaveBeenCalledWith({
      nickname: signupParams.nickname,
      password: signupParams.password,
      email: signupParams.email,
      location: signupParams.location,
      profile_image: signupParams.profile_image,
      introduction: signupParams.introduction,
    });
  });

  test("회원탈퇴 메서드", async () => {
    // deleteSignup method를 실행하기 위해 필요한 Params
    const deleteSignupParams = { user_id: 1 };

    // userRepository의 deleteSignup method 실행
    await userRepository.deleteSignup(deleteSignupParams.user_id);

    // userRepository의 deleteSignup method를 실행했을 때,
    // usersModel의 destroy를 1번 실행하는지 확인
    expect(mockUsersModel.destroy).toHaveBeenCalledTimes(1);
  });

  test("로그인 정보 찾는 메서드", async () => {
    mockUsersModel.findOne = jest.fn(() => {
      return "login user";
    });

    // login method를 실행시키기 위해 필요한 Params(메서드에 전달되는 입력값)
    const loginParams = {
      nickname: "loginNickname",
    };

    // userRepository의 login method 실행
    const loginUser = await userRepository.login(loginParams.nickname);

    // userRepository의 login Method를 실행했을 때,
    // usersModel의 findOne을 1번 실행
    expect(mockUsersModel.findOne).toHaveBeenCalledTimes(1);

    // mockUsersModel의 Return과 출력된 login Method의 값이 일치하는지 비교
    expect(loginUser).toBe("login user");
  });
});
