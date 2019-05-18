# configurationStore

Simple interface for storing settings or document storage using your whatever backend you want to implement. Global configurations will be stored under `/internal/global/` and user-specific configurations will be stored under `/internal/user/<userId>`. The paths can be configured by passing optional arguments to the constructor.

There is a `MockConfigurationStore` class to use as placeholder until you get the intended configuration store setup. It stores configuration in memory.

# Implementing a configuration store

Implement the `IConfigurationStore` or extend the `BaseConfigurationStore` class. Implement at least the following:

1. `setData<T>(settingsPath: string, value: T): Promise<T>`

   Overwrites the endpoint in the database. If path does not exist it should be created.

1. `updateData<T>(settingsPath: string, value: T): Promise<T>`

   Adds the value to the endpoint without overwriting existing data. If path does not exist it should be created

1. `getData<T>(settingsPath: string, defaultValue?: T): Promise<T>`

   Gets the value of the specified endpoint. If endpoint does not exist, it should be created with the `defaultValue`

```ts
class YourConfigurationStore extends BaseConfigurationStore {
  ...
}

const settings = new YourConfigurationStore(...);
...
```

## Retrieve values by key or get it's default value if a value doesn't exist for the key.

```ts
return settings.getGlobalData('someKey', 'default value')
.then(globalValue => ...);
```

```ts
return settings.getUserData('someOtherKey', 'default value')
.then(userValue => ...);
```

## Set the key-value pair, overwriting the endpoint.

```ts
return settings.setGlobalData('someKey', 'some value')
.then(globalValue => ...);
```

```ts
return settings.setUserData('someOtherKey', 'some value')
.then(userValue => ...);
```

## Update the endpoint with some value, without overwriting existing data

```ts
return settings.updateGlobalData('someKey', 'some value')
.then(globalValue => ...);
```

```ts
return settings.updateUserData('someKey', 'some value')
.then(userValue => ...);
```
