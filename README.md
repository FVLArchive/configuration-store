# configurationStore

Simple interface for storing settings or document storage using your whatever backend you want to implement. Global configurations will be stored under `/internal/global/` and user-specific configurations will be stored under `/internal/user/<userId>`.  The paths can be configured by passing optional arguments to the constructor.

# Implementing a configuration store

Implement the `IConfigurationStore` or extend the `BaseConfigurationStore` class.

```ts
class YourConfigurationStore extends BaseConfigurationStore {
  ...
}

const settings = new YourConfigurationStore(...);
await settings.init();
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

## Set the key-value pair.

```ts
return settings.setGlobalData('someKey', 'some value')
.then(globalValue => ...);
```

```ts
return settings.setUserData('someOtherKey', 'some value')
.then(userValue => ...);
```
