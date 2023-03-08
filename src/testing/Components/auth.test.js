import { login } from "../../api/auth"
import axios from "axios";
import { toast } from "react-toastify";

jest.mock("axios");
jest.mock("react-toastify");

describe("login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


  it("should successfully log in user and set local storage", async () => {
    const user = { email: "test@test.com", password: "password" };
    const data = {
      user: { id: 1, name: "Test User" },
      token: "test-token"
    };
    axios.post.mockResolvedValue({ data });
  
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  
    const result = await login(user);
  
    expect(result).toBe(true);
    expect(setItemSpy).toHaveBeenCalledTimes(2);
    expect(setItemSpy).toHaveBeenCalledWith("user", JSON.stringify(data.user));
    expect(setItemSpy).toHaveBeenCalledWith("token", JSON.stringify(data.token));
    expect(toast.success).toHaveBeenCalledWith("¡Éxito! Redirigiendo...");
  
    setItemSpy.mockRestore();
  });
  

  it("should return false and display error toast if login fails", async () => {
    const user = { email: "test@test.com", password: "password" };
    const error = { response: { data: { error: "Invalid email or password" } } };
    axios.post.mockRejectedValue(error);

    const result = await login(user);

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(error.response.data.error);
  });
});
