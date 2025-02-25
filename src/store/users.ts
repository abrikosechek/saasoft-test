import { defineStore } from "pinia";
import type { User, UserToSave } from "@/shared/interfaces";

const createMarkArray = (markString: string) => {
  const result = markString.split(';').map(item => ({ text: item.trim() })).filter(item => item.text)
  return result.length > 0 ? result : null
}

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [] as User[]
  }),
  actions: {
    get() {
      const usersLocalStorageRaw = localStorage.getItem("users")
      const usersLocalStorage = usersLocalStorageRaw && JSON.parse(usersLocalStorageRaw)
      console.log(usersLocalStorage)

      // Create storage array if not created already
      if (usersLocalStorage === null) {
        localStorage.setItem("users", JSON.stringify([]))
        return
      }

      this.users = usersLocalStorage.map((user: User) => ({
        ...user,
        mark: user.mark && user.mark.map((i: { text: string }) => i.text).join(";")
      }))
    },
    set(userInfo: UserToSave) {
      const objectToSave: UserToSave = {
        id: userInfo.id,
        mark: userInfo.mark ? createMarkArray(userInfo.mark) : null,
        type: userInfo.type,
        login: userInfo.login.trim(),
        password: userInfo.password ? userInfo.password.trim() : null
      }

      let usersLocalStorageRaw = localStorage.getItem("users")
      let usersLocalStorage = usersLocalStorageRaw ? JSON.parse(usersLocalStorageRaw) : null
      const userIndex = usersLocalStorage.findIndex((user: User) => user.id == userInfo.id)

      console.log(userInfo.id)
      console.log(userIndex)

      // Change user if exists
      if (userIndex != -1) {
        console.log("changing user")
        usersLocalStorage[userIndex] = objectToSave
      }
      // Or create new user
      else {
        console.log("adding new user")
        usersLocalStorage.push(objectToSave)
      }

      localStorage.setItem("users", JSON.stringify(usersLocalStorage))

      console.log(userInfo)
    },
    addEmptyUser() {
      const usersAmount = this.users.length
      const newUserId = usersAmount ? this.users[usersAmount - 1].id + 1 : 1

      this.users.push({
        id: newUserId,
        mark: null,
        type: "Локальная",
        login: null,
        password: null,
      })
    },
    delete(userId: number) {
      this.users = this.users.filter((user: User) => user.id != userId)
      const usersLocalStorage = JSON.parse(localStorage.getItem("users") || "")
      localStorage.setItem("users", JSON.stringify(usersLocalStorage.filter((user: User) => user.id != userId)))
    }
  }
})