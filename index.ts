export interface IConfigurationStore {
	setGlobalData<T>(key: string, value: T): Promise<T>;
	getGlobalData<T>(key: string, defaultValue?: T): Promise<T>;
	updateGlobalData<T>(key: string, value: T): Promise<T>;
	setUserData<T>(key: string, value: T): Promise<T>;
	getUserData<T>(key: string, defaultValue?: T): Promise<T>;
	updateUserData<T>(key: string, value: T): Promise<T>;
}

export abstract class BaseConfigurationStore implements IConfigurationStore {
	constructor(
		public userID: string,
		private globalPath = 'internal/global/',
		private userPath = 'internal/user/'
	) {}

	protected abstract setData<T>(settingsPath: string, value: T): Promise<T>;
	protected abstract getData<T>(settingsPath: string, defaultValue?: T): Promise<T>;
	protected abstract updateData<T>(settingsPath: string, value: T): Promise<T>;

	private getGlobalSettingsPath(key: string): string {
		return `${this.globalPath}${key}`;
	}

	private getUserSettingsPath(key: string): string {
		return `${this.userPath}${this.userID}/${key}`;
	}

	setGlobalData<T>(key: string, value: T): Promise<T> {
		return this.setData<T>(this.getGlobalSettingsPath(key), value);
	}

	getGlobalData<T>(key: string, defaultValue?: T): Promise<T> {
		return this.getData<T>(this.getGlobalSettingsPath(key), defaultValue);
	}

	updateGlobalData<T>(key: string, value: T): Promise<T> {
		return this.updateData<T>(this.getGlobalSettingsPath(key), value);
	}

	setUserData<T>(key: string, value: T): Promise<T> {
		return this.setData<T>(this.getUserSettingsPath(key), value);
	}

	getUserData<T>(key: string, defaultValue?: T): Promise<T> {
		return this.getData<T>(this.getUserSettingsPath(key), defaultValue);
	}

	updateUserData<T>(key: string, value: T): Promise<T> {
		return this.updateData<T>(this.getUserSettingsPath(key), value);
	}
}

export class MockConfigurationStore extends BaseConfigurationStore {
	private data: { [id: string]: any } = {};

	protected async setData<T>(settingsPath: string, value: T): Promise<T> {
		this.data[settingsPath] = value;
		return value;
	}
	protected async getData<T>(settingsPath: string, defaultValue?: T): Promise<T> {
		return this.data[settingsPath] || defaultValue;
	}
	protected updateData<T>(settingsPath: string, value: T): Promise<T> {
		return this.setData(settingsPath, value);
	}
}
