import { defineStore } from "pinia";
import type { User, UserLocalStorage } from "@/shared/interfaces";

const createMarkArray = (markString: string) => {
  const result = markString.split(';').map(item => ({ text: item.trim() })).filter(item => item.text)
  return result.length > 0 ? result : null
}

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [] as User[],
    usersLocalStorage: [] as UserLocalStorage[]
  }),
  actions: {
    getUsersLocalStorage() {
      const usersLocalStorageRaw = localStorage.getItem("users")
      if (usersLocalStorageRaw === null) {
        this.usersLocalStorage = []
        return
      }
      this.usersLocalStorage = JSON.parse(usersLocalStorageRaw)
    },
    get() {
      this.getUsersLocalStorage()
      // Create storage array if not created already
      if (this.usersLocalStorage === null) {
        localStorage.setItem("users", JSON.stringify([]))
        this.usersLocalStorage = []
        return
      }

      this.users = this.usersLocalStorage.map((user: UserLocalStorage) => ({
        ...user,
        mark: user.mark && user.mark.map((i: { text: string }) => i.text).join(";")
      }))
    },
    set(userInfo: User) {
      const objectToSave: UserLocalStorage = {
        id: userInfo.id,
        mark: userInfo.mark ? createMarkArray(userInfo.mark) : null,
        type: userInfo.type,
        login: userInfo.login.trim(),
        password: userInfo.password ? userInfo.password.trim() : null
      }

      const userIndex = this.usersLocalStorage.findIndex((user: UserLocalStorage) => user.id == userInfo.id)

      // Change user if exists
      if (userIndex != -1) {
        this.usersLocalStorage[userIndex] = objectToSave
      }
      // Or create new user
      else {
        this.usersLocalStorage.push(objectToSave)
      }

      localStorage.setItem("users", JSON.stringify(this.usersLocalStorage))
      this.getUsersLocalStorage()
    },
    addEmptyUser() {
      const usersAmount = this.users.length
      const newUserId = usersAmount ? this.users[usersAmount - 1].id + 1 : 1

      this.users.push({
        id: newUserId,
        mark: null,
        type: "Локальная",
        login: "",
        password: null,
      })
    },
    delete(userId: number) {
      this.users = this.users.filter((user: User) => user.id != userId)
      localStorage.setItem("users", JSON.stringify(this.usersLocalStorage.filter((user: UserLocalStorage) => user.id != userId)))
      this.getUsersLocalStorage()
    }
  }
})