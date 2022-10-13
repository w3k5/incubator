import { ModuleMetadata } from '@nestjs/common';
import { rootMongooseTestModule } from './mongoose-test.module';

export const testModuleDatabasePrepare = async (nestModule: ModuleMetadata): Promise<ModuleMetadata> => {
	return {
		...nestModule,
		imports: [...nestModule.imports, await rootMongooseTestModule()],
	};
};
