import { MockConfigurationStore } from ".."

describe("mock config store", () => {
  const store = new MockConfigurationStore("myUserId")

  test("global value", async () => {
    const valueSet = [{ default: "d1", value: "v1" }, { default: { a: 1, b: 2 }, value: { a: 2, b: 3 } }]
    for (let i = 0; i < valueSet.length; i++) {
      const key = `key${i}`
      const dv = valueSet[i]
      await store
        .getGlobalData(key, dv.default)
        .then(v => expect(v).toBe(dv.default))
        .then(() => store.setGlobalData(key, dv.value))
        .then(v => expect(v).toBe(dv.value))
        .then(() => store.getGlobalData(key))
        .then(v => expect(v).toBe(dv.value))
        .then(() => store.updateGlobalData(key, dv.default))
        .then(() => store.getGlobalData(key))
        .then(v => expect(v).toBe(dv.default))
    }
  })

  test("user value", async () => {
    const valueSet = [{ default: "ud1", value: "uv1" }, { default: { c: 1, d: 2 }, value: { c: 2, d: 3 } }]
    for (let i = 0; i < valueSet.length; i++) {
      const key = `ukey${i}`
      const dv = valueSet[i]
      await store
        .getUserData(key, dv.default)
        .then(v => expect(v).toBe(dv.default))
        .then(() => store.setUserData(key, dv.value))
        .then(v => expect(v).toBe(dv.value))
        .then(() => store.getUserData(key))
        .then(v => expect(v).toBe(dv.value))
        .then(() => store.updateUserData(key, dv.default))
        .then(() => store.getUserData(key))
        .then(v => expect(v).toBe(dv.default))
    }
  })
})
