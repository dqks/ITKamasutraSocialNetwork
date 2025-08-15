import {followUser, followUserThunk, toggleFollowingInProgress, unfollowUser, unfollowUserThunk} from "./usersReducer";
import {usersAPI} from "../api/usersAPI";
import {ResultCodes} from "../api/result-codes";
import {ResponseType} from "../api/reponse-type";

jest.mock("../api/usersAPI") // выполнили мок импорт
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI> // создали переменную с мокнутым API

const result: ResponseType = {
    resultCode: ResultCodes.Success,
    messages: [],
    data: {},
}

let dispatchMock = jest.fn() // Создали замену для диспача
let getStateMock = jest.fn() // Создали замену для getState

beforeEach(() => { // зачищаем моки перед каждым тестом
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.followUser.mockClear()
    userAPIMock.unfollowUser.mockClear()
})


it("follow thunk success", async () => {
    const thunk = followUserThunk(1)

    userAPIMock.followUser.mockReturnValue(Promise.resolve(result)); // прописали возвращаемое значения для мокуемое функции

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, followUser(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingInProgress(false, 1))
})

it("unfollow thunk success", async () => {
    const thunk = unfollowUserThunk(1)

    userAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result)); // прописали возвращаемое значения для мокуемое функции

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, unfollowUser(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingInProgress(false, 1))
})