import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
  Sql,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw, Sql }

/**
 * Prisma Client JS version: 2.9.0-integration-nextjs-custom-output.2
 * Query Engine version: bc00f40f17ea2d691411eb7b529ca1529b68dc80
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): AccountDelegate;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): SessionDelegate;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.verificationRequest`: Exposes CRUD operations for the **VerificationRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationRequests
    * const verificationRequests = await prisma.verificationRequest.findMany()
    * ```
    */
  get verificationRequest(): VerificationRequestDelegate;

  /**
   * `prisma.song`: Exposes CRUD operations for the **Song** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Songs
    * const songs = await prisma.song.findMany()
    * ```
    */
  get song(): SongDelegate;

  /**
   * `prisma.artist`: Exposes CRUD operations for the **Artist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Artists
    * const artists = await prisma.artist.findMany()
    * ```
    */
  get artist(): ArtistDelegate;

  /**
   * `prisma.playlist`: Exposes CRUD operations for the **Playlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Playlists
    * const playlists = await prisma.playlist.findMany()
    * ```
    */
  get playlist(): PlaylistDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const AccountDistinctFieldEnum: {
  id: 'id',
  userId: 'userId',
  providerType: 'providerType',
  providerId: 'providerId',
  providerAccountId: 'providerAccountId',
  refreshToken: 'refreshToken',
  accessToken: 'accessToken',
  accessTokenExpires: 'accessTokenExpires',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

export declare type AccountDistinctFieldEnum = (typeof AccountDistinctFieldEnum)[keyof typeof AccountDistinctFieldEnum]


export declare const SessionDistinctFieldEnum: {
  id: 'id',
  userId: 'userId',
  expires: 'expires',
  sessionToken: 'sessionToken',
  accessToken: 'accessToken',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

export declare type SessionDistinctFieldEnum = (typeof SessionDistinctFieldEnum)[keyof typeof SessionDistinctFieldEnum]


export declare const UserDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  image: 'image',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const VerificationRequestDistinctFieldEnum: {
  id: 'id',
  identifier: 'identifier',
  token: 'token',
  expires: 'expires',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

export declare type VerificationRequestDistinctFieldEnum = (typeof VerificationRequestDistinctFieldEnum)[keyof typeof VerificationRequestDistinctFieldEnum]


export declare const SongDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  youtubeId: 'youtubeId',
  albumCoverUrl: 'albumCoverUrl',
  test: 'test',
  artistId: 'artistId',
  playlistId: 'playlistId'
};

export declare type SongDistinctFieldEnum = (typeof SongDistinctFieldEnum)[keyof typeof SongDistinctFieldEnum]


export declare const ArtistDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  genre: 'genre'
};

export declare type ArtistDistinctFieldEnum = (typeof ArtistDistinctFieldEnum)[keyof typeof ArtistDistinctFieldEnum]


export declare const PlaylistDistinctFieldEnum: {
  id: 'id',
  name: 'name'
};

export declare type PlaylistDistinctFieldEnum = (typeof PlaylistDistinctFieldEnum)[keyof typeof PlaylistDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export declare const QueryMode: {
  default: 'default',
  insensitive: 'insensitive'
};

export declare type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]



/**
 * Model Account
 */

export type Account = {
  id: number
  userId: number
  providerType: string
  providerId: string
  providerAccountId: string
  refreshToken: string | null
  accessToken: string | null
  accessTokenExpires: Date | null
  createdAt: Date
  updatedAt: Date
}


export type AggregateAccount = {
  count: number
  avg: AccountAvgAggregateOutputType | null
  sum: AccountSumAggregateOutputType | null
  min: AccountMinAggregateOutputType | null
  max: AccountMaxAggregateOutputType | null
}

export type AccountAvgAggregateOutputType = {
  id: number
  userId: number
}

export type AccountSumAggregateOutputType = {
  id: number
  userId: number
}

export type AccountMinAggregateOutputType = {
  id: number
  userId: number
}

export type AccountMaxAggregateOutputType = {
  id: number
  userId: number
}


export type AccountAvgAggregateInputType = {
  id?: true
  userId?: true
}

export type AccountSumAggregateInputType = {
  id?: true
  userId?: true
}

export type AccountMinAggregateInputType = {
  id?: true
  userId?: true
}

export type AccountMaxAggregateInputType = {
  id?: true
  userId?: true
}

export type AggregateAccountArgs = {
  where?: AccountWhereInput
  orderBy?: Enumerable<AccountOrderByInput> | AccountOrderByInput
  cursor?: AccountWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<AccountDistinctFieldEnum>
  count?: true
  avg?: AccountAvgAggregateInputType
  sum?: AccountSumAggregateInputType
  min?: AccountMinAggregateInputType
  max?: AccountMaxAggregateInputType
}

export type GetAccountAggregateType<T extends AggregateAccountArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetAccountAggregateScalarType<T[P]>
}

export type GetAccountAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof AccountAvgAggregateOutputType ? AccountAvgAggregateOutputType[P] : never
}
    
    

export type AccountSelect = {
  id?: boolean
  userId?: boolean
  user?: boolean | UserArgs
  providerType?: boolean
  providerId?: boolean
  providerAccountId?: boolean
  refreshToken?: boolean
  accessToken?: boolean
  accessTokenExpires?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type AccountInclude = {
  user?: boolean | UserArgs
}

export type AccountGetPayload<
  S extends boolean | null | undefined | AccountArgs,
  U = keyof S
> = S extends true
  ? Account
  : S extends undefined
  ? never
  : S extends AccountArgs | FindManyAccountArgs
  ? 'include' extends U
    ? Account  & {
      [P in TrueKeys<S['include']>]:
      P extends 'user'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Account ? Account[P]
: 
      P extends 'user'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Account
: Account


export interface AccountDelegate {
  /**
   * Find zero or one Account that matches the filter.
   * @param {FindOneAccountArgs} args - Arguments to find a Account
   * @example
   * // Get one Account
   * const account = await prisma.account.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneAccountArgs>(
    args: Subset<T, FindOneAccountArgs>
  ): CheckSelect<T, Prisma__AccountClient<Account | null>, Prisma__AccountClient<AccountGetPayload<T> | null>>
  /**
   * Find the first Account that matches the filter.
   * @param {FindFirstAccountArgs} args - Arguments to find a Account
   * @example
   * // Get one Account
   * const account = await prisma.account.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstAccountArgs>(
    args: Subset<T, FindFirstAccountArgs>
  ): CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>>
  /**
   * Find zero or more Accounts that matches the filter.
   * @param {FindManyAccountArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Accounts
   * const accounts = await prisma.account.findMany()
   * 
   * // Get first 10 Accounts
   * const accounts = await prisma.account.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyAccountArgs>(
    args?: Subset<T, FindManyAccountArgs>
  ): CheckSelect<T, Promise<Array<Account>>, Promise<Array<AccountGetPayload<T>>>>
  /**
   * Create a Account.
   * @param {AccountCreateArgs} args - Arguments to create a Account.
   * @example
   * // Create one Account
   * const Account = await prisma.account.create({
   *   data: {
   *     // ... data to create a Account
   *   }
   * })
   * 
  **/
  create<T extends AccountCreateArgs>(
    args: Subset<T, AccountCreateArgs>
  ): CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>>
  /**
   * Delete a Account.
   * @param {AccountDeleteArgs} args - Arguments to delete one Account.
   * @example
   * // Delete one Account
   * const Account = await prisma.account.delete({
   *   where: {
   *     // ... filter to delete one Account
   *   }
   * })
   * 
  **/
  delete<T extends AccountDeleteArgs>(
    args: Subset<T, AccountDeleteArgs>
  ): CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>>
  /**
   * Update one Account.
   * @param {AccountUpdateArgs} args - Arguments to update one Account.
   * @example
   * // Update one Account
   * const account = await prisma.account.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends AccountUpdateArgs>(
    args: Subset<T, AccountUpdateArgs>
  ): CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>>
  /**
   * Delete zero or more Accounts.
   * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
   * @example
   * // Delete a few Accounts
   * const { count } = await prisma.account.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends AccountDeleteManyArgs>(
    args: Subset<T, AccountDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Accounts.
   * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Accounts
   * const account = await prisma.account.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends AccountUpdateManyArgs>(
    args: Subset<T, AccountUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Account.
   * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
   * @example
   * // Update or create a Account
   * const account = await prisma.account.upsert({
   *   create: {
   *     // ... data to create a Account
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Account we want to update
   *   }
   * })
  **/
  upsert<T extends AccountUpsertArgs>(
    args: Subset<T, AccountUpsertArgs>
  ): CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyAccountArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateAccountArgs>(args: Subset<T, AggregateAccountArgs>): Promise<GetAccountAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Account.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__AccountClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Account findOne
 */
export type FindOneAccountArgs = {
  /**
   * Select specific fields to fetch from the Account
  **/
  select?: AccountSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AccountInclude | null
  /**
   * Filter, which Account to fetch.
  **/
  where: AccountWhereUniqueInput
}


/**
 * Account findFirst
 */
export type FindFirstAccountArgs = {
  /**
   * Select specific fields to fetch from the Account
  **/
  select?: AccountSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AccountInclude | null
  /**
   * Filter, which Account to fetch.
  **/
  where?: AccountWhereInput
  orderBy?: Enumerable<AccountOrderByInput> | AccountOrderByInput
  cursor?: AccountWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<AccountDistinctFieldEnum>
}


/**
 * Account findMany
 */
export type FindManyAccountArgs = {
  /**
   * Select specific fields to fetch from the Account
  **/
  select?: AccountSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AccountInclude | null
  /**
   * Filter, which Accounts to fetch.
  **/
  where?: AccountWhereInput
  /**
   * Determine the order of the Accounts to fetch.
  **/
  orderBy?: Enumerable<AccountOrderByInput> | AccountOrderByInput
  /**
   * Sets the position for listing Accounts.
  **/
  cursor?: AccountWhereUniqueInput
  /**
   * The number of Accounts to fetch. If negative number, it will take Accounts before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Accounts.
  **/
  skip?: number
  distinct?: Enumerable<AccountDistinctFieldEnum>
}


/**
 * Account create
 */
export type AccountCreateArgs = {
  /**
   * Select specific fields to fetch from the Account
  **/
  select?: AccountSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AccountInclude | null
  /**
   * The data needed to create a Account.
  **/
  data: AccountCreateInput
}


/**
 * Account update
 */
export type AccountUpdateArgs = {
  /**
   * Select specific fields to fetch from the Account
  **/
  select?: AccountSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AccountInclude | null
  /**
   * The data needed to update a Account.
  **/
  data: AccountUpdateInput
  /**
   * Choose, which Account to update.
  **/
  where: AccountWhereUniqueInput
}


/**
 * Account updateMany
 */
export type AccountUpdateManyArgs = {
  data: AccountUpdateManyMutationInput
  where?: AccountWhereInput
}


/**
 * Account upsert
 */
export type AccountUpsertArgs = {
  /**
   * Select specific fields to fetch from the Account
  **/
  select?: AccountSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AccountInclude | null
  /**
   * The filter to search for the Account to update in case it exists.
  **/
  where: AccountWhereUniqueInput
  /**
   * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
  **/
  create: AccountCreateInput
  /**
   * In case the Account was found with the provided `where` argument, update it with this data.
  **/
  update: AccountUpdateInput
}


/**
 * Account delete
 */
export type AccountDeleteArgs = {
  /**
   * Select specific fields to fetch from the Account
  **/
  select?: AccountSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AccountInclude | null
  /**
   * Filter which Account to delete.
  **/
  where: AccountWhereUniqueInput
}


/**
 * Account deleteMany
 */
export type AccountDeleteManyArgs = {
  where?: AccountWhereInput
}


/**
 * Account without action
 */
export type AccountArgs = {
  /**
   * Select specific fields to fetch from the Account
  **/
  select?: AccountSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AccountInclude | null
}



/**
 * Model Session
 */

export type Session = {
  id: number
  userId: number
  expires: Date
  sessionToken: string
  accessToken: string
  createdAt: Date
  updatedAt: Date
}


export type AggregateSession = {
  count: number
  avg: SessionAvgAggregateOutputType | null
  sum: SessionSumAggregateOutputType | null
  min: SessionMinAggregateOutputType | null
  max: SessionMaxAggregateOutputType | null
}

export type SessionAvgAggregateOutputType = {
  id: number
  userId: number
}

export type SessionSumAggregateOutputType = {
  id: number
  userId: number
}

export type SessionMinAggregateOutputType = {
  id: number
  userId: number
}

export type SessionMaxAggregateOutputType = {
  id: number
  userId: number
}


export type SessionAvgAggregateInputType = {
  id?: true
  userId?: true
}

export type SessionSumAggregateInputType = {
  id?: true
  userId?: true
}

export type SessionMinAggregateInputType = {
  id?: true
  userId?: true
}

export type SessionMaxAggregateInputType = {
  id?: true
  userId?: true
}

export type AggregateSessionArgs = {
  where?: SessionWhereInput
  orderBy?: Enumerable<SessionOrderByInput> | SessionOrderByInput
  cursor?: SessionWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SessionDistinctFieldEnum>
  count?: true
  avg?: SessionAvgAggregateInputType
  sum?: SessionSumAggregateInputType
  min?: SessionMinAggregateInputType
  max?: SessionMaxAggregateInputType
}

export type GetSessionAggregateType<T extends AggregateSessionArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetSessionAggregateScalarType<T[P]>
}

export type GetSessionAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof SessionAvgAggregateOutputType ? SessionAvgAggregateOutputType[P] : never
}
    
    

export type SessionSelect = {
  id?: boolean
  userId?: boolean
  user?: boolean | UserArgs
  expires?: boolean
  sessionToken?: boolean
  accessToken?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type SessionInclude = {
  user?: boolean | UserArgs
}

export type SessionGetPayload<
  S extends boolean | null | undefined | SessionArgs,
  U = keyof S
> = S extends true
  ? Session
  : S extends undefined
  ? never
  : S extends SessionArgs | FindManySessionArgs
  ? 'include' extends U
    ? Session  & {
      [P in TrueKeys<S['include']>]:
      P extends 'user'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Session ? Session[P]
: 
      P extends 'user'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Session
: Session


export interface SessionDelegate {
  /**
   * Find zero or one Session that matches the filter.
   * @param {FindOneSessionArgs} args - Arguments to find a Session
   * @example
   * // Get one Session
   * const session = await prisma.session.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneSessionArgs>(
    args: Subset<T, FindOneSessionArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session | null>, Prisma__SessionClient<SessionGetPayload<T> | null>>
  /**
   * Find the first Session that matches the filter.
   * @param {FindFirstSessionArgs} args - Arguments to find a Session
   * @example
   * // Get one Session
   * const session = await prisma.session.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstSessionArgs>(
    args: Subset<T, FindFirstSessionArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>
  /**
   * Find zero or more Sessions that matches the filter.
   * @param {FindManySessionArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Sessions
   * const sessions = await prisma.session.findMany()
   * 
   * // Get first 10 Sessions
   * const sessions = await prisma.session.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManySessionArgs>(
    args?: Subset<T, FindManySessionArgs>
  ): CheckSelect<T, Promise<Array<Session>>, Promise<Array<SessionGetPayload<T>>>>
  /**
   * Create a Session.
   * @param {SessionCreateArgs} args - Arguments to create a Session.
   * @example
   * // Create one Session
   * const Session = await prisma.session.create({
   *   data: {
   *     // ... data to create a Session
   *   }
   * })
   * 
  **/
  create<T extends SessionCreateArgs>(
    args: Subset<T, SessionCreateArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>
  /**
   * Delete a Session.
   * @param {SessionDeleteArgs} args - Arguments to delete one Session.
   * @example
   * // Delete one Session
   * const Session = await prisma.session.delete({
   *   where: {
   *     // ... filter to delete one Session
   *   }
   * })
   * 
  **/
  delete<T extends SessionDeleteArgs>(
    args: Subset<T, SessionDeleteArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>
  /**
   * Update one Session.
   * @param {SessionUpdateArgs} args - Arguments to update one Session.
   * @example
   * // Update one Session
   * const session = await prisma.session.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends SessionUpdateArgs>(
    args: Subset<T, SessionUpdateArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>
  /**
   * Delete zero or more Sessions.
   * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
   * @example
   * // Delete a few Sessions
   * const { count } = await prisma.session.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends SessionDeleteManyArgs>(
    args: Subset<T, SessionDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Sessions.
   * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Sessions
   * const session = await prisma.session.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends SessionUpdateManyArgs>(
    args: Subset<T, SessionUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Session.
   * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
   * @example
   * // Update or create a Session
   * const session = await prisma.session.upsert({
   *   create: {
   *     // ... data to create a Session
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Session we want to update
   *   }
   * })
  **/
  upsert<T extends SessionUpsertArgs>(
    args: Subset<T, SessionUpsertArgs>
  ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManySessionArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateSessionArgs>(args: Subset<T, AggregateSessionArgs>): Promise<GetSessionAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Session.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__SessionClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Session findOne
 */
export type FindOneSessionArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * Filter, which Session to fetch.
  **/
  where: SessionWhereUniqueInput
}


/**
 * Session findFirst
 */
export type FindFirstSessionArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * Filter, which Session to fetch.
  **/
  where?: SessionWhereInput
  orderBy?: Enumerable<SessionOrderByInput> | SessionOrderByInput
  cursor?: SessionWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SessionDistinctFieldEnum>
}


/**
 * Session findMany
 */
export type FindManySessionArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * Filter, which Sessions to fetch.
  **/
  where?: SessionWhereInput
  /**
   * Determine the order of the Sessions to fetch.
  **/
  orderBy?: Enumerable<SessionOrderByInput> | SessionOrderByInput
  /**
   * Sets the position for listing Sessions.
  **/
  cursor?: SessionWhereUniqueInput
  /**
   * The number of Sessions to fetch. If negative number, it will take Sessions before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Sessions.
  **/
  skip?: number
  distinct?: Enumerable<SessionDistinctFieldEnum>
}


/**
 * Session create
 */
export type SessionCreateArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * The data needed to create a Session.
  **/
  data: SessionCreateInput
}


/**
 * Session update
 */
export type SessionUpdateArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * The data needed to update a Session.
  **/
  data: SessionUpdateInput
  /**
   * Choose, which Session to update.
  **/
  where: SessionWhereUniqueInput
}


/**
 * Session updateMany
 */
export type SessionUpdateManyArgs = {
  data: SessionUpdateManyMutationInput
  where?: SessionWhereInput
}


/**
 * Session upsert
 */
export type SessionUpsertArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * The filter to search for the Session to update in case it exists.
  **/
  where: SessionWhereUniqueInput
  /**
   * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
  **/
  create: SessionCreateInput
  /**
   * In case the Session was found with the provided `where` argument, update it with this data.
  **/
  update: SessionUpdateInput
}


/**
 * Session delete
 */
export type SessionDeleteArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
  /**
   * Filter which Session to delete.
  **/
  where: SessionWhereUniqueInput
}


/**
 * Session deleteMany
 */
export type SessionDeleteManyArgs = {
  where?: SessionWhereInput
}


/**
 * Session without action
 */
export type SessionArgs = {
  /**
   * Select specific fields to fetch from the Session
  **/
  select?: SessionSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SessionInclude | null
}



/**
 * Model User
 */

export type User = {
  id: number
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  createdAt: Date
  updatedAt: Date
}


export type AggregateUser = {
  count: number
  avg: UserAvgAggregateOutputType | null
  sum: UserSumAggregateOutputType | null
  min: UserMinAggregateOutputType | null
  max: UserMaxAggregateOutputType | null
}

export type UserAvgAggregateOutputType = {
  id: number
}

export type UserSumAggregateOutputType = {
  id: number
}

export type UserMinAggregateOutputType = {
  id: number
}

export type UserMaxAggregateOutputType = {
  id: number
}


export type UserAvgAggregateInputType = {
  id?: true
}

export type UserSumAggregateInputType = {
  id?: true
}

export type UserMinAggregateInputType = {
  id?: true
}

export type UserMaxAggregateInputType = {
  id?: true
}

export type AggregateUserArgs = {
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
  count?: true
  avg?: UserAvgAggregateInputType
  sum?: UserSumAggregateInputType
  min?: UserMinAggregateInputType
  max?: UserMaxAggregateInputType
}

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>
}

export type GetUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserAvgAggregateOutputType ? UserAvgAggregateOutputType[P] : never
}
    
    

export type UserSelect = {
  id?: boolean
  name?: boolean
  email?: boolean
  emailVerified?: boolean
  accounts?: boolean | FindManyAccountArgs
  sessions?: boolean | FindManySessionArgs
  image?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type UserInclude = {
  accounts?: boolean | FindManyAccountArgs
  sessions?: boolean | FindManySessionArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'accounts'
      ? Array<AccountGetPayload<S['include'][P]>> :
      P extends 'sessions'
      ? Array<SessionGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'accounts'
      ? Array<AccountGetPayload<S['select'][P]>> :
      P extends 'sessions'
      ? Array<SessionGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User that matches the filter.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find the first User that matches the filter.
   * @param {FindFirstUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstUserArgs>(
    args: Subset<T, FindFirstUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Find zero or more Users that matches the filter.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  accounts<T extends FindManyAccountArgs = {}>(args?: Subset<T, FindManyAccountArgs>): CheckSelect<T, Promise<Array<Account>>, Promise<Array<AccountGetPayload<T>>>>;

  sessions<T extends FindManySessionArgs = {}>(args?: Subset<T, FindManySessionArgs>): CheckSelect<T, Promise<Array<Session>>, Promise<Array<SessionGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findFirst
 */
export type FindFirstUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model VerificationRequest
 */

export type VerificationRequest = {
  id: number
  identifier: string
  token: string
  expires: Date
  createdAt: Date
  updatedAt: Date
}


export type AggregateVerificationRequest = {
  count: number
  avg: VerificationRequestAvgAggregateOutputType | null
  sum: VerificationRequestSumAggregateOutputType | null
  min: VerificationRequestMinAggregateOutputType | null
  max: VerificationRequestMaxAggregateOutputType | null
}

export type VerificationRequestAvgAggregateOutputType = {
  id: number
}

export type VerificationRequestSumAggregateOutputType = {
  id: number
}

export type VerificationRequestMinAggregateOutputType = {
  id: number
}

export type VerificationRequestMaxAggregateOutputType = {
  id: number
}


export type VerificationRequestAvgAggregateInputType = {
  id?: true
}

export type VerificationRequestSumAggregateInputType = {
  id?: true
}

export type VerificationRequestMinAggregateInputType = {
  id?: true
}

export type VerificationRequestMaxAggregateInputType = {
  id?: true
}

export type AggregateVerificationRequestArgs = {
  where?: VerificationRequestWhereInput
  orderBy?: Enumerable<VerificationRequestOrderByInput> | VerificationRequestOrderByInput
  cursor?: VerificationRequestWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<VerificationRequestDistinctFieldEnum>
  count?: true
  avg?: VerificationRequestAvgAggregateInputType
  sum?: VerificationRequestSumAggregateInputType
  min?: VerificationRequestMinAggregateInputType
  max?: VerificationRequestMaxAggregateInputType
}

export type GetVerificationRequestAggregateType<T extends AggregateVerificationRequestArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetVerificationRequestAggregateScalarType<T[P]>
}

export type GetVerificationRequestAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof VerificationRequestAvgAggregateOutputType ? VerificationRequestAvgAggregateOutputType[P] : never
}
    
    

export type VerificationRequestSelect = {
  id?: boolean
  identifier?: boolean
  token?: boolean
  expires?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type VerificationRequestGetPayload<
  S extends boolean | null | undefined | VerificationRequestArgs,
  U = keyof S
> = S extends true
  ? VerificationRequest
  : S extends undefined
  ? never
  : S extends VerificationRequestArgs | FindManyVerificationRequestArgs
  ? 'include' extends U
    ? VerificationRequest 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof VerificationRequest ? VerificationRequest[P]
: 
 never
    }
  : VerificationRequest
: VerificationRequest


export interface VerificationRequestDelegate {
  /**
   * Find zero or one VerificationRequest that matches the filter.
   * @param {FindOneVerificationRequestArgs} args - Arguments to find a VerificationRequest
   * @example
   * // Get one VerificationRequest
   * const verificationRequest = await prisma.verificationRequest.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneVerificationRequestArgs>(
    args: Subset<T, FindOneVerificationRequestArgs>
  ): CheckSelect<T, Prisma__VerificationRequestClient<VerificationRequest | null>, Prisma__VerificationRequestClient<VerificationRequestGetPayload<T> | null>>
  /**
   * Find the first VerificationRequest that matches the filter.
   * @param {FindFirstVerificationRequestArgs} args - Arguments to find a VerificationRequest
   * @example
   * // Get one VerificationRequest
   * const verificationRequest = await prisma.verificationRequest.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstVerificationRequestArgs>(
    args: Subset<T, FindFirstVerificationRequestArgs>
  ): CheckSelect<T, Prisma__VerificationRequestClient<VerificationRequest>, Prisma__VerificationRequestClient<VerificationRequestGetPayload<T>>>
  /**
   * Find zero or more VerificationRequests that matches the filter.
   * @param {FindManyVerificationRequestArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all VerificationRequests
   * const verificationRequests = await prisma.verificationRequest.findMany()
   * 
   * // Get first 10 VerificationRequests
   * const verificationRequests = await prisma.verificationRequest.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const verificationRequestWithIdOnly = await prisma.verificationRequest.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyVerificationRequestArgs>(
    args?: Subset<T, FindManyVerificationRequestArgs>
  ): CheckSelect<T, Promise<Array<VerificationRequest>>, Promise<Array<VerificationRequestGetPayload<T>>>>
  /**
   * Create a VerificationRequest.
   * @param {VerificationRequestCreateArgs} args - Arguments to create a VerificationRequest.
   * @example
   * // Create one VerificationRequest
   * const VerificationRequest = await prisma.verificationRequest.create({
   *   data: {
   *     // ... data to create a VerificationRequest
   *   }
   * })
   * 
  **/
  create<T extends VerificationRequestCreateArgs>(
    args: Subset<T, VerificationRequestCreateArgs>
  ): CheckSelect<T, Prisma__VerificationRequestClient<VerificationRequest>, Prisma__VerificationRequestClient<VerificationRequestGetPayload<T>>>
  /**
   * Delete a VerificationRequest.
   * @param {VerificationRequestDeleteArgs} args - Arguments to delete one VerificationRequest.
   * @example
   * // Delete one VerificationRequest
   * const VerificationRequest = await prisma.verificationRequest.delete({
   *   where: {
   *     // ... filter to delete one VerificationRequest
   *   }
   * })
   * 
  **/
  delete<T extends VerificationRequestDeleteArgs>(
    args: Subset<T, VerificationRequestDeleteArgs>
  ): CheckSelect<T, Prisma__VerificationRequestClient<VerificationRequest>, Prisma__VerificationRequestClient<VerificationRequestGetPayload<T>>>
  /**
   * Update one VerificationRequest.
   * @param {VerificationRequestUpdateArgs} args - Arguments to update one VerificationRequest.
   * @example
   * // Update one VerificationRequest
   * const verificationRequest = await prisma.verificationRequest.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends VerificationRequestUpdateArgs>(
    args: Subset<T, VerificationRequestUpdateArgs>
  ): CheckSelect<T, Prisma__VerificationRequestClient<VerificationRequest>, Prisma__VerificationRequestClient<VerificationRequestGetPayload<T>>>
  /**
   * Delete zero or more VerificationRequests.
   * @param {VerificationRequestDeleteManyArgs} args - Arguments to filter VerificationRequests to delete.
   * @example
   * // Delete a few VerificationRequests
   * const { count } = await prisma.verificationRequest.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends VerificationRequestDeleteManyArgs>(
    args: Subset<T, VerificationRequestDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more VerificationRequests.
   * @param {VerificationRequestUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many VerificationRequests
   * const verificationRequest = await prisma.verificationRequest.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends VerificationRequestUpdateManyArgs>(
    args: Subset<T, VerificationRequestUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one VerificationRequest.
   * @param {VerificationRequestUpsertArgs} args - Arguments to update or create a VerificationRequest.
   * @example
   * // Update or create a VerificationRequest
   * const verificationRequest = await prisma.verificationRequest.upsert({
   *   create: {
   *     // ... data to create a VerificationRequest
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the VerificationRequest we want to update
   *   }
   * })
  **/
  upsert<T extends VerificationRequestUpsertArgs>(
    args: Subset<T, VerificationRequestUpsertArgs>
  ): CheckSelect<T, Prisma__VerificationRequestClient<VerificationRequest>, Prisma__VerificationRequestClient<VerificationRequestGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyVerificationRequestArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateVerificationRequestArgs>(args: Subset<T, AggregateVerificationRequestArgs>): Promise<GetVerificationRequestAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for VerificationRequest.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__VerificationRequestClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * VerificationRequest findOne
 */
export type FindOneVerificationRequestArgs = {
  /**
   * Select specific fields to fetch from the VerificationRequest
  **/
  select?: VerificationRequestSelect | null
  /**
   * Filter, which VerificationRequest to fetch.
  **/
  where: VerificationRequestWhereUniqueInput
}


/**
 * VerificationRequest findFirst
 */
export type FindFirstVerificationRequestArgs = {
  /**
   * Select specific fields to fetch from the VerificationRequest
  **/
  select?: VerificationRequestSelect | null
  /**
   * Filter, which VerificationRequest to fetch.
  **/
  where?: VerificationRequestWhereInput
  orderBy?: Enumerable<VerificationRequestOrderByInput> | VerificationRequestOrderByInput
  cursor?: VerificationRequestWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<VerificationRequestDistinctFieldEnum>
}


/**
 * VerificationRequest findMany
 */
export type FindManyVerificationRequestArgs = {
  /**
   * Select specific fields to fetch from the VerificationRequest
  **/
  select?: VerificationRequestSelect | null
  /**
   * Filter, which VerificationRequests to fetch.
  **/
  where?: VerificationRequestWhereInput
  /**
   * Determine the order of the VerificationRequests to fetch.
  **/
  orderBy?: Enumerable<VerificationRequestOrderByInput> | VerificationRequestOrderByInput
  /**
   * Sets the position for listing VerificationRequests.
  **/
  cursor?: VerificationRequestWhereUniqueInput
  /**
   * The number of VerificationRequests to fetch. If negative number, it will take VerificationRequests before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` VerificationRequests.
  **/
  skip?: number
  distinct?: Enumerable<VerificationRequestDistinctFieldEnum>
}


/**
 * VerificationRequest create
 */
export type VerificationRequestCreateArgs = {
  /**
   * Select specific fields to fetch from the VerificationRequest
  **/
  select?: VerificationRequestSelect | null
  /**
   * The data needed to create a VerificationRequest.
  **/
  data: VerificationRequestCreateInput
}


/**
 * VerificationRequest update
 */
export type VerificationRequestUpdateArgs = {
  /**
   * Select specific fields to fetch from the VerificationRequest
  **/
  select?: VerificationRequestSelect | null
  /**
   * The data needed to update a VerificationRequest.
  **/
  data: VerificationRequestUpdateInput
  /**
   * Choose, which VerificationRequest to update.
  **/
  where: VerificationRequestWhereUniqueInput
}


/**
 * VerificationRequest updateMany
 */
export type VerificationRequestUpdateManyArgs = {
  data: VerificationRequestUpdateManyMutationInput
  where?: VerificationRequestWhereInput
}


/**
 * VerificationRequest upsert
 */
export type VerificationRequestUpsertArgs = {
  /**
   * Select specific fields to fetch from the VerificationRequest
  **/
  select?: VerificationRequestSelect | null
  /**
   * The filter to search for the VerificationRequest to update in case it exists.
  **/
  where: VerificationRequestWhereUniqueInput
  /**
   * In case the VerificationRequest found by the `where` argument doesn't exist, create a new VerificationRequest with this data.
  **/
  create: VerificationRequestCreateInput
  /**
   * In case the VerificationRequest was found with the provided `where` argument, update it with this data.
  **/
  update: VerificationRequestUpdateInput
}


/**
 * VerificationRequest delete
 */
export type VerificationRequestDeleteArgs = {
  /**
   * Select specific fields to fetch from the VerificationRequest
  **/
  select?: VerificationRequestSelect | null
  /**
   * Filter which VerificationRequest to delete.
  **/
  where: VerificationRequestWhereUniqueInput
}


/**
 * VerificationRequest deleteMany
 */
export type VerificationRequestDeleteManyArgs = {
  where?: VerificationRequestWhereInput
}


/**
 * VerificationRequest without action
 */
export type VerificationRequestArgs = {
  /**
   * Select specific fields to fetch from the VerificationRequest
  **/
  select?: VerificationRequestSelect | null
}



/**
 * Model Song
 */

export type Song = {
  id: number
  name: string
  youtubeId: string | null
  albumCoverUrl: string | null
  test: string
  artistId: number | null
  playlistId: number | null
}


export type AggregateSong = {
  count: number
  avg: SongAvgAggregateOutputType | null
  sum: SongSumAggregateOutputType | null
  min: SongMinAggregateOutputType | null
  max: SongMaxAggregateOutputType | null
}

export type SongAvgAggregateOutputType = {
  id: number
  artistId: number | null
  playlistId: number | null
}

export type SongSumAggregateOutputType = {
  id: number
  artistId: number | null
  playlistId: number | null
}

export type SongMinAggregateOutputType = {
  id: number
  artistId: number | null
  playlistId: number | null
}

export type SongMaxAggregateOutputType = {
  id: number
  artistId: number | null
  playlistId: number | null
}


export type SongAvgAggregateInputType = {
  id?: true
  artistId?: true
  playlistId?: true
}

export type SongSumAggregateInputType = {
  id?: true
  artistId?: true
  playlistId?: true
}

export type SongMinAggregateInputType = {
  id?: true
  artistId?: true
  playlistId?: true
}

export type SongMaxAggregateInputType = {
  id?: true
  artistId?: true
  playlistId?: true
}

export type AggregateSongArgs = {
  where?: SongWhereInput
  orderBy?: Enumerable<SongOrderByInput> | SongOrderByInput
  cursor?: SongWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SongDistinctFieldEnum>
  count?: true
  avg?: SongAvgAggregateInputType
  sum?: SongSumAggregateInputType
  min?: SongMinAggregateInputType
  max?: SongMaxAggregateInputType
}

export type GetSongAggregateType<T extends AggregateSongArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetSongAggregateScalarType<T[P]>
}

export type GetSongAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof SongAvgAggregateOutputType ? SongAvgAggregateOutputType[P] : never
}
    
    

export type SongSelect = {
  id?: boolean
  name?: boolean
  youtubeId?: boolean
  albumCoverUrl?: boolean
  test?: boolean
  artistId?: boolean
  playlistId?: boolean
  artist?: boolean | ArtistArgs
  Playlist?: boolean | PlaylistArgs
}

export type SongInclude = {
  artist?: boolean | ArtistArgs
  Playlist?: boolean | PlaylistArgs
}

export type SongGetPayload<
  S extends boolean | null | undefined | SongArgs,
  U = keyof S
> = S extends true
  ? Song
  : S extends undefined
  ? never
  : S extends SongArgs | FindManySongArgs
  ? 'include' extends U
    ? Song  & {
      [P in TrueKeys<S['include']>]:
      P extends 'artist'
      ? ArtistGetPayload<S['include'][P]> | null :
      P extends 'Playlist'
      ? PlaylistGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Song ? Song[P]
: 
      P extends 'artist'
      ? ArtistGetPayload<S['select'][P]> | null :
      P extends 'Playlist'
      ? PlaylistGetPayload<S['select'][P]> | null : never
    }
  : Song
: Song


export interface SongDelegate {
  /**
   * Find zero or one Song that matches the filter.
   * @param {FindOneSongArgs} args - Arguments to find a Song
   * @example
   * // Get one Song
   * const song = await prisma.song.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneSongArgs>(
    args: Subset<T, FindOneSongArgs>
  ): CheckSelect<T, Prisma__SongClient<Song | null>, Prisma__SongClient<SongGetPayload<T> | null>>
  /**
   * Find the first Song that matches the filter.
   * @param {FindFirstSongArgs} args - Arguments to find a Song
   * @example
   * // Get one Song
   * const song = await prisma.song.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstSongArgs>(
    args: Subset<T, FindFirstSongArgs>
  ): CheckSelect<T, Prisma__SongClient<Song>, Prisma__SongClient<SongGetPayload<T>>>
  /**
   * Find zero or more Songs that matches the filter.
   * @param {FindManySongArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Songs
   * const songs = await prisma.song.findMany()
   * 
   * // Get first 10 Songs
   * const songs = await prisma.song.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const songWithIdOnly = await prisma.song.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManySongArgs>(
    args?: Subset<T, FindManySongArgs>
  ): CheckSelect<T, Promise<Array<Song>>, Promise<Array<SongGetPayload<T>>>>
  /**
   * Create a Song.
   * @param {SongCreateArgs} args - Arguments to create a Song.
   * @example
   * // Create one Song
   * const Song = await prisma.song.create({
   *   data: {
   *     // ... data to create a Song
   *   }
   * })
   * 
  **/
  create<T extends SongCreateArgs>(
    args: Subset<T, SongCreateArgs>
  ): CheckSelect<T, Prisma__SongClient<Song>, Prisma__SongClient<SongGetPayload<T>>>
  /**
   * Delete a Song.
   * @param {SongDeleteArgs} args - Arguments to delete one Song.
   * @example
   * // Delete one Song
   * const Song = await prisma.song.delete({
   *   where: {
   *     // ... filter to delete one Song
   *   }
   * })
   * 
  **/
  delete<T extends SongDeleteArgs>(
    args: Subset<T, SongDeleteArgs>
  ): CheckSelect<T, Prisma__SongClient<Song>, Prisma__SongClient<SongGetPayload<T>>>
  /**
   * Update one Song.
   * @param {SongUpdateArgs} args - Arguments to update one Song.
   * @example
   * // Update one Song
   * const song = await prisma.song.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends SongUpdateArgs>(
    args: Subset<T, SongUpdateArgs>
  ): CheckSelect<T, Prisma__SongClient<Song>, Prisma__SongClient<SongGetPayload<T>>>
  /**
   * Delete zero or more Songs.
   * @param {SongDeleteManyArgs} args - Arguments to filter Songs to delete.
   * @example
   * // Delete a few Songs
   * const { count } = await prisma.song.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends SongDeleteManyArgs>(
    args: Subset<T, SongDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Songs.
   * @param {SongUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Songs
   * const song = await prisma.song.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends SongUpdateManyArgs>(
    args: Subset<T, SongUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Song.
   * @param {SongUpsertArgs} args - Arguments to update or create a Song.
   * @example
   * // Update or create a Song
   * const song = await prisma.song.upsert({
   *   create: {
   *     // ... data to create a Song
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Song we want to update
   *   }
   * })
  **/
  upsert<T extends SongUpsertArgs>(
    args: Subset<T, SongUpsertArgs>
  ): CheckSelect<T, Prisma__SongClient<Song>, Prisma__SongClient<SongGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManySongArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateSongArgs>(args: Subset<T, AggregateSongArgs>): Promise<GetSongAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Song.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__SongClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  artist<T extends ArtistArgs = {}>(args?: Subset<T, ArtistArgs>): CheckSelect<T, Prisma__ArtistClient<Artist | null>, Prisma__ArtistClient<ArtistGetPayload<T> | null>>;

  Playlist<T extends PlaylistArgs = {}>(args?: Subset<T, PlaylistArgs>): CheckSelect<T, Prisma__PlaylistClient<Playlist | null>, Prisma__PlaylistClient<PlaylistGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Song findOne
 */
export type FindOneSongArgs = {
  /**
   * Select specific fields to fetch from the Song
  **/
  select?: SongSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SongInclude | null
  /**
   * Filter, which Song to fetch.
  **/
  where: SongWhereUniqueInput
}


/**
 * Song findFirst
 */
export type FindFirstSongArgs = {
  /**
   * Select specific fields to fetch from the Song
  **/
  select?: SongSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SongInclude | null
  /**
   * Filter, which Song to fetch.
  **/
  where?: SongWhereInput
  orderBy?: Enumerable<SongOrderByInput> | SongOrderByInput
  cursor?: SongWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<SongDistinctFieldEnum>
}


/**
 * Song findMany
 */
export type FindManySongArgs = {
  /**
   * Select specific fields to fetch from the Song
  **/
  select?: SongSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SongInclude | null
  /**
   * Filter, which Songs to fetch.
  **/
  where?: SongWhereInput
  /**
   * Determine the order of the Songs to fetch.
  **/
  orderBy?: Enumerable<SongOrderByInput> | SongOrderByInput
  /**
   * Sets the position for listing Songs.
  **/
  cursor?: SongWhereUniqueInput
  /**
   * The number of Songs to fetch. If negative number, it will take Songs before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Songs.
  **/
  skip?: number
  distinct?: Enumerable<SongDistinctFieldEnum>
}


/**
 * Song create
 */
export type SongCreateArgs = {
  /**
   * Select specific fields to fetch from the Song
  **/
  select?: SongSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SongInclude | null
  /**
   * The data needed to create a Song.
  **/
  data: SongCreateInput
}


/**
 * Song update
 */
export type SongUpdateArgs = {
  /**
   * Select specific fields to fetch from the Song
  **/
  select?: SongSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SongInclude | null
  /**
   * The data needed to update a Song.
  **/
  data: SongUpdateInput
  /**
   * Choose, which Song to update.
  **/
  where: SongWhereUniqueInput
}


/**
 * Song updateMany
 */
export type SongUpdateManyArgs = {
  data: SongUpdateManyMutationInput
  where?: SongWhereInput
}


/**
 * Song upsert
 */
export type SongUpsertArgs = {
  /**
   * Select specific fields to fetch from the Song
  **/
  select?: SongSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SongInclude | null
  /**
   * The filter to search for the Song to update in case it exists.
  **/
  where: SongWhereUniqueInput
  /**
   * In case the Song found by the `where` argument doesn't exist, create a new Song with this data.
  **/
  create: SongCreateInput
  /**
   * In case the Song was found with the provided `where` argument, update it with this data.
  **/
  update: SongUpdateInput
}


/**
 * Song delete
 */
export type SongDeleteArgs = {
  /**
   * Select specific fields to fetch from the Song
  **/
  select?: SongSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SongInclude | null
  /**
   * Filter which Song to delete.
  **/
  where: SongWhereUniqueInput
}


/**
 * Song deleteMany
 */
export type SongDeleteManyArgs = {
  where?: SongWhereInput
}


/**
 * Song without action
 */
export type SongArgs = {
  /**
   * Select specific fields to fetch from the Song
  **/
  select?: SongSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SongInclude | null
}



/**
 * Model Artist
 */

export type Artist = {
  id: number
  name: string
  genre: string | null
}


export type AggregateArtist = {
  count: number
  avg: ArtistAvgAggregateOutputType | null
  sum: ArtistSumAggregateOutputType | null
  min: ArtistMinAggregateOutputType | null
  max: ArtistMaxAggregateOutputType | null
}

export type ArtistAvgAggregateOutputType = {
  id: number
}

export type ArtistSumAggregateOutputType = {
  id: number
}

export type ArtistMinAggregateOutputType = {
  id: number
}

export type ArtistMaxAggregateOutputType = {
  id: number
}


export type ArtistAvgAggregateInputType = {
  id?: true
}

export type ArtistSumAggregateInputType = {
  id?: true
}

export type ArtistMinAggregateInputType = {
  id?: true
}

export type ArtistMaxAggregateInputType = {
  id?: true
}

export type AggregateArtistArgs = {
  where?: ArtistWhereInput
  orderBy?: Enumerable<ArtistOrderByInput> | ArtistOrderByInput
  cursor?: ArtistWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ArtistDistinctFieldEnum>
  count?: true
  avg?: ArtistAvgAggregateInputType
  sum?: ArtistSumAggregateInputType
  min?: ArtistMinAggregateInputType
  max?: ArtistMaxAggregateInputType
}

export type GetArtistAggregateType<T extends AggregateArtistArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetArtistAggregateScalarType<T[P]>
}

export type GetArtistAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ArtistAvgAggregateOutputType ? ArtistAvgAggregateOutputType[P] : never
}
    
    

export type ArtistSelect = {
  id?: boolean
  name?: boolean
  genre?: boolean
  songs?: boolean | FindManySongArgs
}

export type ArtistInclude = {
  songs?: boolean | FindManySongArgs
}

export type ArtistGetPayload<
  S extends boolean | null | undefined | ArtistArgs,
  U = keyof S
> = S extends true
  ? Artist
  : S extends undefined
  ? never
  : S extends ArtistArgs | FindManyArtistArgs
  ? 'include' extends U
    ? Artist  & {
      [P in TrueKeys<S['include']>]:
      P extends 'songs'
      ? Array<SongGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Artist ? Artist[P]
: 
      P extends 'songs'
      ? Array<SongGetPayload<S['select'][P]>> : never
    }
  : Artist
: Artist


export interface ArtistDelegate {
  /**
   * Find zero or one Artist that matches the filter.
   * @param {FindOneArtistArgs} args - Arguments to find a Artist
   * @example
   * // Get one Artist
   * const artist = await prisma.artist.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneArtistArgs>(
    args: Subset<T, FindOneArtistArgs>
  ): CheckSelect<T, Prisma__ArtistClient<Artist | null>, Prisma__ArtistClient<ArtistGetPayload<T> | null>>
  /**
   * Find the first Artist that matches the filter.
   * @param {FindFirstArtistArgs} args - Arguments to find a Artist
   * @example
   * // Get one Artist
   * const artist = await prisma.artist.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstArtistArgs>(
    args: Subset<T, FindFirstArtistArgs>
  ): CheckSelect<T, Prisma__ArtistClient<Artist>, Prisma__ArtistClient<ArtistGetPayload<T>>>
  /**
   * Find zero or more Artists that matches the filter.
   * @param {FindManyArtistArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Artists
   * const artists = await prisma.artist.findMany()
   * 
   * // Get first 10 Artists
   * const artists = await prisma.artist.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const artistWithIdOnly = await prisma.artist.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyArtistArgs>(
    args?: Subset<T, FindManyArtistArgs>
  ): CheckSelect<T, Promise<Array<Artist>>, Promise<Array<ArtistGetPayload<T>>>>
  /**
   * Create a Artist.
   * @param {ArtistCreateArgs} args - Arguments to create a Artist.
   * @example
   * // Create one Artist
   * const Artist = await prisma.artist.create({
   *   data: {
   *     // ... data to create a Artist
   *   }
   * })
   * 
  **/
  create<T extends ArtistCreateArgs>(
    args: Subset<T, ArtistCreateArgs>
  ): CheckSelect<T, Prisma__ArtistClient<Artist>, Prisma__ArtistClient<ArtistGetPayload<T>>>
  /**
   * Delete a Artist.
   * @param {ArtistDeleteArgs} args - Arguments to delete one Artist.
   * @example
   * // Delete one Artist
   * const Artist = await prisma.artist.delete({
   *   where: {
   *     // ... filter to delete one Artist
   *   }
   * })
   * 
  **/
  delete<T extends ArtistDeleteArgs>(
    args: Subset<T, ArtistDeleteArgs>
  ): CheckSelect<T, Prisma__ArtistClient<Artist>, Prisma__ArtistClient<ArtistGetPayload<T>>>
  /**
   * Update one Artist.
   * @param {ArtistUpdateArgs} args - Arguments to update one Artist.
   * @example
   * // Update one Artist
   * const artist = await prisma.artist.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ArtistUpdateArgs>(
    args: Subset<T, ArtistUpdateArgs>
  ): CheckSelect<T, Prisma__ArtistClient<Artist>, Prisma__ArtistClient<ArtistGetPayload<T>>>
  /**
   * Delete zero or more Artists.
   * @param {ArtistDeleteManyArgs} args - Arguments to filter Artists to delete.
   * @example
   * // Delete a few Artists
   * const { count } = await prisma.artist.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ArtistDeleteManyArgs>(
    args: Subset<T, ArtistDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Artists.
   * @param {ArtistUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Artists
   * const artist = await prisma.artist.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ArtistUpdateManyArgs>(
    args: Subset<T, ArtistUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Artist.
   * @param {ArtistUpsertArgs} args - Arguments to update or create a Artist.
   * @example
   * // Update or create a Artist
   * const artist = await prisma.artist.upsert({
   *   create: {
   *     // ... data to create a Artist
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Artist we want to update
   *   }
   * })
  **/
  upsert<T extends ArtistUpsertArgs>(
    args: Subset<T, ArtistUpsertArgs>
  ): CheckSelect<T, Prisma__ArtistClient<Artist>, Prisma__ArtistClient<ArtistGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyArtistArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateArtistArgs>(args: Subset<T, AggregateArtistArgs>): Promise<GetArtistAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Artist.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ArtistClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  songs<T extends FindManySongArgs = {}>(args?: Subset<T, FindManySongArgs>): CheckSelect<T, Promise<Array<Song>>, Promise<Array<SongGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Artist findOne
 */
export type FindOneArtistArgs = {
  /**
   * Select specific fields to fetch from the Artist
  **/
  select?: ArtistSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ArtistInclude | null
  /**
   * Filter, which Artist to fetch.
  **/
  where: ArtistWhereUniqueInput
}


/**
 * Artist findFirst
 */
export type FindFirstArtistArgs = {
  /**
   * Select specific fields to fetch from the Artist
  **/
  select?: ArtistSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ArtistInclude | null
  /**
   * Filter, which Artist to fetch.
  **/
  where?: ArtistWhereInput
  orderBy?: Enumerable<ArtistOrderByInput> | ArtistOrderByInput
  cursor?: ArtistWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ArtistDistinctFieldEnum>
}


/**
 * Artist findMany
 */
export type FindManyArtistArgs = {
  /**
   * Select specific fields to fetch from the Artist
  **/
  select?: ArtistSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ArtistInclude | null
  /**
   * Filter, which Artists to fetch.
  **/
  where?: ArtistWhereInput
  /**
   * Determine the order of the Artists to fetch.
  **/
  orderBy?: Enumerable<ArtistOrderByInput> | ArtistOrderByInput
  /**
   * Sets the position for listing Artists.
  **/
  cursor?: ArtistWhereUniqueInput
  /**
   * The number of Artists to fetch. If negative number, it will take Artists before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Artists.
  **/
  skip?: number
  distinct?: Enumerable<ArtistDistinctFieldEnum>
}


/**
 * Artist create
 */
export type ArtistCreateArgs = {
  /**
   * Select specific fields to fetch from the Artist
  **/
  select?: ArtistSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ArtistInclude | null
  /**
   * The data needed to create a Artist.
  **/
  data: ArtistCreateInput
}


/**
 * Artist update
 */
export type ArtistUpdateArgs = {
  /**
   * Select specific fields to fetch from the Artist
  **/
  select?: ArtistSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ArtistInclude | null
  /**
   * The data needed to update a Artist.
  **/
  data: ArtistUpdateInput
  /**
   * Choose, which Artist to update.
  **/
  where: ArtistWhereUniqueInput
}


/**
 * Artist updateMany
 */
export type ArtistUpdateManyArgs = {
  data: ArtistUpdateManyMutationInput
  where?: ArtistWhereInput
}


/**
 * Artist upsert
 */
export type ArtistUpsertArgs = {
  /**
   * Select specific fields to fetch from the Artist
  **/
  select?: ArtistSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ArtistInclude | null
  /**
   * The filter to search for the Artist to update in case it exists.
  **/
  where: ArtistWhereUniqueInput
  /**
   * In case the Artist found by the `where` argument doesn't exist, create a new Artist with this data.
  **/
  create: ArtistCreateInput
  /**
   * In case the Artist was found with the provided `where` argument, update it with this data.
  **/
  update: ArtistUpdateInput
}


/**
 * Artist delete
 */
export type ArtistDeleteArgs = {
  /**
   * Select specific fields to fetch from the Artist
  **/
  select?: ArtistSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ArtistInclude | null
  /**
   * Filter which Artist to delete.
  **/
  where: ArtistWhereUniqueInput
}


/**
 * Artist deleteMany
 */
export type ArtistDeleteManyArgs = {
  where?: ArtistWhereInput
}


/**
 * Artist without action
 */
export type ArtistArgs = {
  /**
   * Select specific fields to fetch from the Artist
  **/
  select?: ArtistSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ArtistInclude | null
}



/**
 * Model Playlist
 */

export type Playlist = {
  id: number
  name: string
}


export type AggregatePlaylist = {
  count: number
  avg: PlaylistAvgAggregateOutputType | null
  sum: PlaylistSumAggregateOutputType | null
  min: PlaylistMinAggregateOutputType | null
  max: PlaylistMaxAggregateOutputType | null
}

export type PlaylistAvgAggregateOutputType = {
  id: number
}

export type PlaylistSumAggregateOutputType = {
  id: number
}

export type PlaylistMinAggregateOutputType = {
  id: number
}

export type PlaylistMaxAggregateOutputType = {
  id: number
}


export type PlaylistAvgAggregateInputType = {
  id?: true
}

export type PlaylistSumAggregateInputType = {
  id?: true
}

export type PlaylistMinAggregateInputType = {
  id?: true
}

export type PlaylistMaxAggregateInputType = {
  id?: true
}

export type AggregatePlaylistArgs = {
  where?: PlaylistWhereInput
  orderBy?: Enumerable<PlaylistOrderByInput> | PlaylistOrderByInput
  cursor?: PlaylistWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PlaylistDistinctFieldEnum>
  count?: true
  avg?: PlaylistAvgAggregateInputType
  sum?: PlaylistSumAggregateInputType
  min?: PlaylistMinAggregateInputType
  max?: PlaylistMaxAggregateInputType
}

export type GetPlaylistAggregateType<T extends AggregatePlaylistArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetPlaylistAggregateScalarType<T[P]>
}

export type GetPlaylistAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof PlaylistAvgAggregateOutputType ? PlaylistAvgAggregateOutputType[P] : never
}
    
    

export type PlaylistSelect = {
  id?: boolean
  name?: boolean
  songs?: boolean | FindManySongArgs
}

export type PlaylistInclude = {
  songs?: boolean | FindManySongArgs
}

export type PlaylistGetPayload<
  S extends boolean | null | undefined | PlaylistArgs,
  U = keyof S
> = S extends true
  ? Playlist
  : S extends undefined
  ? never
  : S extends PlaylistArgs | FindManyPlaylistArgs
  ? 'include' extends U
    ? Playlist  & {
      [P in TrueKeys<S['include']>]:
      P extends 'songs'
      ? Array<SongGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Playlist ? Playlist[P]
: 
      P extends 'songs'
      ? Array<SongGetPayload<S['select'][P]>> : never
    }
  : Playlist
: Playlist


export interface PlaylistDelegate {
  /**
   * Find zero or one Playlist that matches the filter.
   * @param {FindOnePlaylistArgs} args - Arguments to find a Playlist
   * @example
   * // Get one Playlist
   * const playlist = await prisma.playlist.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePlaylistArgs>(
    args: Subset<T, FindOnePlaylistArgs>
  ): CheckSelect<T, Prisma__PlaylistClient<Playlist | null>, Prisma__PlaylistClient<PlaylistGetPayload<T> | null>>
  /**
   * Find the first Playlist that matches the filter.
   * @param {FindFirstPlaylistArgs} args - Arguments to find a Playlist
   * @example
   * // Get one Playlist
   * const playlist = await prisma.playlist.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstPlaylistArgs>(
    args: Subset<T, FindFirstPlaylistArgs>
  ): CheckSelect<T, Prisma__PlaylistClient<Playlist>, Prisma__PlaylistClient<PlaylistGetPayload<T>>>
  /**
   * Find zero or more Playlists that matches the filter.
   * @param {FindManyPlaylistArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Playlists
   * const playlists = await prisma.playlist.findMany()
   * 
   * // Get first 10 Playlists
   * const playlists = await prisma.playlist.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const playlistWithIdOnly = await prisma.playlist.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyPlaylistArgs>(
    args?: Subset<T, FindManyPlaylistArgs>
  ): CheckSelect<T, Promise<Array<Playlist>>, Promise<Array<PlaylistGetPayload<T>>>>
  /**
   * Create a Playlist.
   * @param {PlaylistCreateArgs} args - Arguments to create a Playlist.
   * @example
   * // Create one Playlist
   * const Playlist = await prisma.playlist.create({
   *   data: {
   *     // ... data to create a Playlist
   *   }
   * })
   * 
  **/
  create<T extends PlaylistCreateArgs>(
    args: Subset<T, PlaylistCreateArgs>
  ): CheckSelect<T, Prisma__PlaylistClient<Playlist>, Prisma__PlaylistClient<PlaylistGetPayload<T>>>
  /**
   * Delete a Playlist.
   * @param {PlaylistDeleteArgs} args - Arguments to delete one Playlist.
   * @example
   * // Delete one Playlist
   * const Playlist = await prisma.playlist.delete({
   *   where: {
   *     // ... filter to delete one Playlist
   *   }
   * })
   * 
  **/
  delete<T extends PlaylistDeleteArgs>(
    args: Subset<T, PlaylistDeleteArgs>
  ): CheckSelect<T, Prisma__PlaylistClient<Playlist>, Prisma__PlaylistClient<PlaylistGetPayload<T>>>
  /**
   * Update one Playlist.
   * @param {PlaylistUpdateArgs} args - Arguments to update one Playlist.
   * @example
   * // Update one Playlist
   * const playlist = await prisma.playlist.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends PlaylistUpdateArgs>(
    args: Subset<T, PlaylistUpdateArgs>
  ): CheckSelect<T, Prisma__PlaylistClient<Playlist>, Prisma__PlaylistClient<PlaylistGetPayload<T>>>
  /**
   * Delete zero or more Playlists.
   * @param {PlaylistDeleteManyArgs} args - Arguments to filter Playlists to delete.
   * @example
   * // Delete a few Playlists
   * const { count } = await prisma.playlist.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends PlaylistDeleteManyArgs>(
    args: Subset<T, PlaylistDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Playlists.
   * @param {PlaylistUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Playlists
   * const playlist = await prisma.playlist.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends PlaylistUpdateManyArgs>(
    args: Subset<T, PlaylistUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Playlist.
   * @param {PlaylistUpsertArgs} args - Arguments to update or create a Playlist.
   * @example
   * // Update or create a Playlist
   * const playlist = await prisma.playlist.upsert({
   *   create: {
   *     // ... data to create a Playlist
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Playlist we want to update
   *   }
   * })
  **/
  upsert<T extends PlaylistUpsertArgs>(
    args: Subset<T, PlaylistUpsertArgs>
  ): CheckSelect<T, Prisma__PlaylistClient<Playlist>, Prisma__PlaylistClient<PlaylistGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyPlaylistArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregatePlaylistArgs>(args: Subset<T, AggregatePlaylistArgs>): Promise<GetPlaylistAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Playlist.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__PlaylistClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  songs<T extends FindManySongArgs = {}>(args?: Subset<T, FindManySongArgs>): CheckSelect<T, Promise<Array<Song>>, Promise<Array<SongGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Playlist findOne
 */
export type FindOnePlaylistArgs = {
  /**
   * Select specific fields to fetch from the Playlist
  **/
  select?: PlaylistSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PlaylistInclude | null
  /**
   * Filter, which Playlist to fetch.
  **/
  where: PlaylistWhereUniqueInput
}


/**
 * Playlist findFirst
 */
export type FindFirstPlaylistArgs = {
  /**
   * Select specific fields to fetch from the Playlist
  **/
  select?: PlaylistSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PlaylistInclude | null
  /**
   * Filter, which Playlist to fetch.
  **/
  where?: PlaylistWhereInput
  orderBy?: Enumerable<PlaylistOrderByInput> | PlaylistOrderByInput
  cursor?: PlaylistWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<PlaylistDistinctFieldEnum>
}


/**
 * Playlist findMany
 */
export type FindManyPlaylistArgs = {
  /**
   * Select specific fields to fetch from the Playlist
  **/
  select?: PlaylistSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PlaylistInclude | null
  /**
   * Filter, which Playlists to fetch.
  **/
  where?: PlaylistWhereInput
  /**
   * Determine the order of the Playlists to fetch.
  **/
  orderBy?: Enumerable<PlaylistOrderByInput> | PlaylistOrderByInput
  /**
   * Sets the position for listing Playlists.
  **/
  cursor?: PlaylistWhereUniqueInput
  /**
   * The number of Playlists to fetch. If negative number, it will take Playlists before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Playlists.
  **/
  skip?: number
  distinct?: Enumerable<PlaylistDistinctFieldEnum>
}


/**
 * Playlist create
 */
export type PlaylistCreateArgs = {
  /**
   * Select specific fields to fetch from the Playlist
  **/
  select?: PlaylistSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PlaylistInclude | null
  /**
   * The data needed to create a Playlist.
  **/
  data: PlaylistCreateInput
}


/**
 * Playlist update
 */
export type PlaylistUpdateArgs = {
  /**
   * Select specific fields to fetch from the Playlist
  **/
  select?: PlaylistSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PlaylistInclude | null
  /**
   * The data needed to update a Playlist.
  **/
  data: PlaylistUpdateInput
  /**
   * Choose, which Playlist to update.
  **/
  where: PlaylistWhereUniqueInput
}


/**
 * Playlist updateMany
 */
export type PlaylistUpdateManyArgs = {
  data: PlaylistUpdateManyMutationInput
  where?: PlaylistWhereInput
}


/**
 * Playlist upsert
 */
export type PlaylistUpsertArgs = {
  /**
   * Select specific fields to fetch from the Playlist
  **/
  select?: PlaylistSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PlaylistInclude | null
  /**
   * The filter to search for the Playlist to update in case it exists.
  **/
  where: PlaylistWhereUniqueInput
  /**
   * In case the Playlist found by the `where` argument doesn't exist, create a new Playlist with this data.
  **/
  create: PlaylistCreateInput
  /**
   * In case the Playlist was found with the provided `where` argument, update it with this data.
  **/
  update: PlaylistUpdateInput
}


/**
 * Playlist delete
 */
export type PlaylistDeleteArgs = {
  /**
   * Select specific fields to fetch from the Playlist
  **/
  select?: PlaylistSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PlaylistInclude | null
  /**
   * Filter which Playlist to delete.
  **/
  where: PlaylistWhereUniqueInput
}


/**
 * Playlist deleteMany
 */
export type PlaylistDeleteManyArgs = {
  where?: PlaylistWhereInput
}


/**
 * Playlist without action
 */
export type PlaylistArgs = {
  /**
   * Select specific fields to fetch from the Playlist
  **/
  select?: PlaylistSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PlaylistInclude | null
}



/**
 * Deep Input Types
 */


export type AccountWhereInput = {
  AND?: AccountWhereInput | Enumerable<AccountWhereInput>
  OR?: AccountWhereInput | Enumerable<AccountWhereInput>
  NOT?: AccountWhereInput | Enumerable<AccountWhereInput>
  id?: IntFilter | number
  userId?: IntFilter | number
  user?: UserRelationFilter | UserWhereInput
  providerType?: StringFilter | string
  providerId?: StringFilter | string
  providerAccountId?: StringFilter | string
  refreshToken?: StringNullableFilter | string | null
  accessToken?: StringNullableFilter | string | null
  accessTokenExpires?: DateTimeNullableFilter | Date | string | null
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
}

export type AccountOrderByInput = {
  id?: SortOrder
  userId?: SortOrder
  providerType?: SortOrder
  providerId?: SortOrder
  providerAccountId?: SortOrder
  refreshToken?: SortOrder
  accessToken?: SortOrder
  accessTokenExpires?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
}

export type AccountWhereUniqueInput = {
  id?: number
  providerId_providerAccountId?: ProviderIdProviderAccountIdCompoundUniqueInput
}

export type SessionWhereInput = {
  AND?: SessionWhereInput | Enumerable<SessionWhereInput>
  OR?: SessionWhereInput | Enumerable<SessionWhereInput>
  NOT?: SessionWhereInput | Enumerable<SessionWhereInput>
  id?: IntFilter | number
  userId?: IntFilter | number
  user?: UserRelationFilter | UserWhereInput
  expires?: DateTimeFilter | Date | string
  sessionToken?: StringFilter | string
  accessToken?: StringFilter | string
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
}

export type SessionOrderByInput = {
  id?: SortOrder
  userId?: SortOrder
  expires?: SortOrder
  sessionToken?: SortOrder
  accessToken?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
}

export type SessionWhereUniqueInput = {
  id?: number
  sessionToken?: string
  accessToken?: string
}

export type UserWhereInput = {
  AND?: UserWhereInput | Enumerable<UserWhereInput>
  OR?: UserWhereInput | Enumerable<UserWhereInput>
  NOT?: UserWhereInput | Enumerable<UserWhereInput>
  id?: IntFilter | number
  name?: StringNullableFilter | string | null
  email?: StringNullableFilter | string | null
  emailVerified?: DateTimeNullableFilter | Date | string | null
  accounts?: AccountListRelationFilter
  sessions?: SessionListRelationFilter
  image?: StringNullableFilter | string | null
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
}

export type UserOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  email?: SortOrder
  emailVerified?: SortOrder
  image?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
  email?: string
}

export type VerificationRequestWhereInput = {
  AND?: VerificationRequestWhereInput | Enumerable<VerificationRequestWhereInput>
  OR?: VerificationRequestWhereInput | Enumerable<VerificationRequestWhereInput>
  NOT?: VerificationRequestWhereInput | Enumerable<VerificationRequestWhereInput>
  id?: IntFilter | number
  identifier?: StringFilter | string
  token?: StringFilter | string
  expires?: DateTimeFilter | Date | string
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
}

export type VerificationRequestOrderByInput = {
  id?: SortOrder
  identifier?: SortOrder
  token?: SortOrder
  expires?: SortOrder
  createdAt?: SortOrder
  updatedAt?: SortOrder
}

export type VerificationRequestWhereUniqueInput = {
  id?: number
  token?: string
}

export type SongWhereInput = {
  AND?: SongWhereInput | Enumerable<SongWhereInput>
  OR?: SongWhereInput | Enumerable<SongWhereInput>
  NOT?: SongWhereInput | Enumerable<SongWhereInput>
  id?: IntFilter | number
  name?: StringFilter | string
  youtubeId?: StringNullableFilter | string | null
  albumCoverUrl?: StringNullableFilter | string | null
  test?: StringFilter | string
  artistId?: IntNullableFilter | number | null
  playlistId?: IntNullableFilter | number | null
  artist?: ArtistRelationFilter | ArtistWhereInput | null
  Playlist?: PlaylistRelationFilter | PlaylistWhereInput | null
}

export type SongOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  youtubeId?: SortOrder
  albumCoverUrl?: SortOrder
  test?: SortOrder
  artistId?: SortOrder
  playlistId?: SortOrder
}

export type SongWhereUniqueInput = {
  id?: number
}

export type ArtistWhereInput = {
  AND?: ArtistWhereInput | Enumerable<ArtistWhereInput>
  OR?: ArtistWhereInput | Enumerable<ArtistWhereInput>
  NOT?: ArtistWhereInput | Enumerable<ArtistWhereInput>
  id?: IntFilter | number
  name?: StringFilter | string
  genre?: StringNullableFilter | string | null
  songs?: SongListRelationFilter
}

export type ArtistOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  genre?: SortOrder
}

export type ArtistWhereUniqueInput = {
  id?: number
  name?: string
}

export type PlaylistWhereInput = {
  AND?: PlaylistWhereInput | Enumerable<PlaylistWhereInput>
  OR?: PlaylistWhereInput | Enumerable<PlaylistWhereInput>
  NOT?: PlaylistWhereInput | Enumerable<PlaylistWhereInput>
  id?: IntFilter | number
  name?: StringFilter | string
  songs?: SongListRelationFilter
}

export type PlaylistOrderByInput = {
  id?: SortOrder
  name?: SortOrder
}

export type PlaylistWhereUniqueInput = {
  id?: number
  name?: string
}

export type AccountCreateInput = {
  providerType: string
  providerId: string
  providerAccountId: string
  refreshToken?: string | null
  accessToken?: string | null
  accessTokenExpires?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  user: UserCreateOneWithoutAccountsInput
}

export type AccountUpdateInput = {
  providerType?: string | StringFieldUpdateOperationsInput
  providerId?: string | StringFieldUpdateOperationsInput
  providerAccountId?: string | StringFieldUpdateOperationsInput
  refreshToken?: string | NullableStringFieldUpdateOperationsInput | null
  accessToken?: string | NullableStringFieldUpdateOperationsInput | null
  accessTokenExpires?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  user?: UserUpdateOneRequiredWithoutAccountsInput
}

export type AccountUpdateManyMutationInput = {
  providerType?: string | StringFieldUpdateOperationsInput
  providerId?: string | StringFieldUpdateOperationsInput
  providerAccountId?: string | StringFieldUpdateOperationsInput
  refreshToken?: string | NullableStringFieldUpdateOperationsInput | null
  accessToken?: string | NullableStringFieldUpdateOperationsInput | null
  accessTokenExpires?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type SessionCreateInput = {
  expires: Date | string
  sessionToken: string
  accessToken: string
  createdAt?: Date | string
  updatedAt?: Date | string
  user: UserCreateOneWithoutSessionsInput
}

export type SessionUpdateInput = {
  expires?: Date | string | DateTimeFieldUpdateOperationsInput
  sessionToken?: string | StringFieldUpdateOperationsInput
  accessToken?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  user?: UserUpdateOneRequiredWithoutSessionsInput
}

export type SessionUpdateManyMutationInput = {
  expires?: Date | string | DateTimeFieldUpdateOperationsInput
  sessionToken?: string | StringFieldUpdateOperationsInput
  accessToken?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type UserCreateInput = {
  name?: string | null
  email?: string | null
  emailVerified?: Date | string | null
  image?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  accounts?: AccountCreateManyWithoutUserInput
  sessions?: SessionCreateManyWithoutUserInput
}

export type UserUpdateInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | NullableStringFieldUpdateOperationsInput | null
  emailVerified?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  image?: string | NullableStringFieldUpdateOperationsInput | null
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  accounts?: AccountUpdateManyWithoutUserInput
  sessions?: SessionUpdateManyWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | NullableStringFieldUpdateOperationsInput | null
  emailVerified?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  image?: string | NullableStringFieldUpdateOperationsInput | null
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type VerificationRequestCreateInput = {
  identifier: string
  token: string
  expires: Date | string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type VerificationRequestUpdateInput = {
  identifier?: string | StringFieldUpdateOperationsInput
  token?: string | StringFieldUpdateOperationsInput
  expires?: Date | string | DateTimeFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type VerificationRequestUpdateManyMutationInput = {
  identifier?: string | StringFieldUpdateOperationsInput
  token?: string | StringFieldUpdateOperationsInput
  expires?: Date | string | DateTimeFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type SongCreateInput = {
  name: string
  youtubeId?: string | null
  albumCoverUrl?: string | null
  test?: string
  artist?: ArtistCreateOneWithoutSongsInput
  Playlist?: PlaylistCreateOneWithoutSongsInput
}

export type SongUpdateInput = {
  name?: string | StringFieldUpdateOperationsInput
  youtubeId?: string | NullableStringFieldUpdateOperationsInput | null
  albumCoverUrl?: string | NullableStringFieldUpdateOperationsInput | null
  test?: string | StringFieldUpdateOperationsInput
  artist?: ArtistUpdateOneWithoutSongsInput
  Playlist?: PlaylistUpdateOneWithoutSongsInput
}

export type SongUpdateManyMutationInput = {
  name?: string | StringFieldUpdateOperationsInput
  youtubeId?: string | NullableStringFieldUpdateOperationsInput | null
  albumCoverUrl?: string | NullableStringFieldUpdateOperationsInput | null
  test?: string | StringFieldUpdateOperationsInput
}

export type ArtistCreateInput = {
  name: string
  genre?: string | null
  songs?: SongCreateManyWithoutArtistInput
}

export type ArtistUpdateInput = {
  name?: string | StringFieldUpdateOperationsInput
  genre?: string | NullableStringFieldUpdateOperationsInput | null
  songs?: SongUpdateManyWithoutArtistInput
}

export type ArtistUpdateManyMutationInput = {
  name?: string | StringFieldUpdateOperationsInput
  genre?: string | NullableStringFieldUpdateOperationsInput | null
}

export type PlaylistCreateInput = {
  name: string
  songs?: SongCreateManyWithoutPlaylistInput
}

export type PlaylistUpdateInput = {
  name?: string | StringFieldUpdateOperationsInput
  songs?: SongUpdateManyWithoutPlaylistInput
}

export type PlaylistUpdateManyMutationInput = {
  name?: string | StringFieldUpdateOperationsInput
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type UserRelationFilter = {
  is?: UserWhereInput
  isNot?: UserWhereInput
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringFilter
}

export type StringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringNullableFilter | null
}

export type DateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date> | Enumerable<string> | null
  notIn?: Enumerable<Date> | Enumerable<string> | null
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeNullableFilter | null
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type ProviderIdProviderAccountIdCompoundUniqueInput = {
  providerId: string
  providerAccountId: string
}

export type AccountListRelationFilter = {
  every?: AccountWhereInput
  some?: AccountWhereInput
  none?: AccountWhereInput
}

export type SessionListRelationFilter = {
  every?: SessionWhereInput
  some?: SessionWhereInput
  none?: SessionWhereInput
}

export type IntNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntNullableFilter | null
}

export type ArtistRelationFilter = {
  is?: ArtistWhereInput | null
  isNot?: ArtistWhereInput | null
}

export type PlaylistRelationFilter = {
  is?: PlaylistWhereInput | null
  isNot?: PlaylistWhereInput | null
}

export type SongListRelationFilter = {
  every?: SongWhereInput
  some?: SongWhereInput
  none?: SongWhereInput
}

export type UserCreateOneWithoutAccountsInput = {
  create?: UserCreateWithoutAccountsInput
  connect?: UserWhereUniqueInput
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null
}

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: Date | string | null
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type UserUpdateOneRequiredWithoutAccountsInput = {
  create?: UserCreateWithoutAccountsInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutAccountsDataInput
  upsert?: UserUpsertWithoutAccountsInput
}

export type UserCreateOneWithoutSessionsInput = {
  create?: UserCreateWithoutSessionsInput
  connect?: UserWhereUniqueInput
}

export type UserUpdateOneRequiredWithoutSessionsInput = {
  create?: UserCreateWithoutSessionsInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutSessionsDataInput
  upsert?: UserUpsertWithoutSessionsInput
}

export type AccountCreateManyWithoutUserInput = {
  create?: AccountCreateWithoutUserInput | Enumerable<AccountCreateWithoutUserInput>
  connect?: AccountWhereUniqueInput | Enumerable<AccountWhereUniqueInput>
}

export type SessionCreateManyWithoutUserInput = {
  create?: SessionCreateWithoutUserInput | Enumerable<SessionCreateWithoutUserInput>
  connect?: SessionWhereUniqueInput | Enumerable<SessionWhereUniqueInput>
}

export type AccountUpdateManyWithoutUserInput = {
  create?: AccountCreateWithoutUserInput | Enumerable<AccountCreateWithoutUserInput>
  connect?: AccountWhereUniqueInput | Enumerable<AccountWhereUniqueInput>
  set?: AccountWhereUniqueInput | Enumerable<AccountWhereUniqueInput>
  disconnect?: AccountWhereUniqueInput | Enumerable<AccountWhereUniqueInput>
  delete?: AccountWhereUniqueInput | Enumerable<AccountWhereUniqueInput>
  update?: AccountUpdateWithWhereUniqueWithoutUserInput | Enumerable<AccountUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: AccountUpdateManyWithWhereNestedInput | Enumerable<AccountUpdateManyWithWhereNestedInput>
  deleteMany?: AccountScalarWhereInput | Enumerable<AccountScalarWhereInput>
  upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | Enumerable<AccountUpsertWithWhereUniqueWithoutUserInput>
}

export type SessionUpdateManyWithoutUserInput = {
  create?: SessionCreateWithoutUserInput | Enumerable<SessionCreateWithoutUserInput>
  connect?: SessionWhereUniqueInput | Enumerable<SessionWhereUniqueInput>
  set?: SessionWhereUniqueInput | Enumerable<SessionWhereUniqueInput>
  disconnect?: SessionWhereUniqueInput | Enumerable<SessionWhereUniqueInput>
  delete?: SessionWhereUniqueInput | Enumerable<SessionWhereUniqueInput>
  update?: SessionUpdateWithWhereUniqueWithoutUserInput | Enumerable<SessionUpdateWithWhereUniqueWithoutUserInput>
  updateMany?: SessionUpdateManyWithWhereNestedInput | Enumerable<SessionUpdateManyWithWhereNestedInput>
  deleteMany?: SessionScalarWhereInput | Enumerable<SessionScalarWhereInput>
  upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | Enumerable<SessionUpsertWithWhereUniqueWithoutUserInput>
}

export type ArtistCreateOneWithoutSongsInput = {
  create?: ArtistCreateWithoutSongsInput
  connect?: ArtistWhereUniqueInput
}

export type PlaylistCreateOneWithoutSongsInput = {
  create?: PlaylistCreateWithoutSongsInput
  connect?: PlaylistWhereUniqueInput
}

export type ArtistUpdateOneWithoutSongsInput = {
  create?: ArtistCreateWithoutSongsInput
  connect?: ArtistWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: ArtistUpdateWithoutSongsDataInput
  upsert?: ArtistUpsertWithoutSongsInput
}

export type PlaylistUpdateOneWithoutSongsInput = {
  create?: PlaylistCreateWithoutSongsInput
  connect?: PlaylistWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: PlaylistUpdateWithoutSongsDataInput
  upsert?: PlaylistUpsertWithoutSongsInput
}

export type SongCreateManyWithoutArtistInput = {
  create?: SongCreateWithoutArtistInput | Enumerable<SongCreateWithoutArtistInput>
  connect?: SongWhereUniqueInput | Enumerable<SongWhereUniqueInput>
}

export type SongUpdateManyWithoutArtistInput = {
  create?: SongCreateWithoutArtistInput | Enumerable<SongCreateWithoutArtistInput>
  connect?: SongWhereUniqueInput | Enumerable<SongWhereUniqueInput>
  set?: SongWhereUniqueInput | Enumerable<SongWhereUniqueInput>
  disconnect?: SongWhereUniqueInput | Enumerable<SongWhereUniqueInput>
  delete?: SongWhereUniqueInput | Enumerable<SongWhereUniqueInput>
  update?: SongUpdateWithWhereUniqueWithoutArtistInput | Enumerable<SongUpdateWithWhereUniqueWithoutArtistInput>
  updateMany?: SongUpdateManyWithWhereNestedInput | Enumerable<SongUpdateManyWithWhereNestedInput>
  deleteMany?: SongScalarWhereInput | Enumerable<SongScalarWhereInput>
  upsert?: SongUpsertWithWhereUniqueWithoutArtistInput | Enumerable<SongUpsertWithWhereUniqueWithoutArtistInput>
}

export type SongCreateManyWithoutPlaylistInput = {
  create?: SongCreateWithoutPlaylistInput | Enumerable<SongCreateWithoutPlaylistInput>
  connect?: SongWhereUniqueInput | Enumerable<SongWhereUniqueInput>
}

export type SongUpdateManyWithoutPlaylistInput = {
  create?: SongCreateWithoutPlaylistInput | Enumerable<SongCreateWithoutPlaylistInput>
  connect?: SongWhereUniqueInput | Enumerable<SongWhereUniqueInput>
  set?: SongWhereUniqueInput | Enumerable<SongWhereUniqueInput>
  disconnect?: SongWhereUniqueInput | Enumerable<SongWhereUniqueInput>
  delete?: SongWhereUniqueInput | Enumerable<SongWhereUniqueInput>
  update?: SongUpdateWithWhereUniqueWithoutPlaylistInput | Enumerable<SongUpdateWithWhereUniqueWithoutPlaylistInput>
  updateMany?: SongUpdateManyWithWhereNestedInput | Enumerable<SongUpdateManyWithWhereNestedInput>
  deleteMany?: SongScalarWhereInput | Enumerable<SongScalarWhereInput>
  upsert?: SongUpsertWithWhereUniqueWithoutPlaylistInput | Enumerable<SongUpsertWithWhereUniqueWithoutPlaylistInput>
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type NestedStringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringNullableFilter | null
}

export type NestedDateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date> | Enumerable<string> | null
  notIn?: Enumerable<Date> | Enumerable<string> | null
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeNullableFilter | null
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type NestedIntNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntNullableFilter | null
}

export type UserCreateWithoutAccountsInput = {
  name?: string | null
  email?: string | null
  emailVerified?: Date | string | null
  image?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  sessions?: SessionCreateManyWithoutUserInput
}

export type UserUpdateWithoutAccountsDataInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | NullableStringFieldUpdateOperationsInput | null
  emailVerified?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  image?: string | NullableStringFieldUpdateOperationsInput | null
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  sessions?: SessionUpdateManyWithoutUserInput
}

export type UserUpsertWithoutAccountsInput = {
  update: UserUpdateWithoutAccountsDataInput
  create: UserCreateWithoutAccountsInput
}

export type UserCreateWithoutSessionsInput = {
  name?: string | null
  email?: string | null
  emailVerified?: Date | string | null
  image?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  accounts?: AccountCreateManyWithoutUserInput
}

export type UserUpdateWithoutSessionsDataInput = {
  name?: string | NullableStringFieldUpdateOperationsInput | null
  email?: string | NullableStringFieldUpdateOperationsInput | null
  emailVerified?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  image?: string | NullableStringFieldUpdateOperationsInput | null
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
  accounts?: AccountUpdateManyWithoutUserInput
}

export type UserUpsertWithoutSessionsInput = {
  update: UserUpdateWithoutSessionsDataInput
  create: UserCreateWithoutSessionsInput
}

export type AccountCreateWithoutUserInput = {
  providerType: string
  providerId: string
  providerAccountId: string
  refreshToken?: string | null
  accessToken?: string | null
  accessTokenExpires?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type SessionCreateWithoutUserInput = {
  expires: Date | string
  sessionToken: string
  accessToken: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type AccountUpdateWithWhereUniqueWithoutUserInput = {
  where: AccountWhereUniqueInput
  data: AccountUpdateWithoutUserDataInput
}

export type AccountUpdateManyWithWhereNestedInput = {
  where: AccountScalarWhereInput
  data: AccountUpdateManyDataInput
}

export type AccountScalarWhereInput = {
  AND?: AccountScalarWhereInput | Enumerable<AccountScalarWhereInput>
  OR?: AccountScalarWhereInput | Enumerable<AccountScalarWhereInput>
  NOT?: AccountScalarWhereInput | Enumerable<AccountScalarWhereInput>
  id?: IntFilter | number
  userId?: IntFilter | number
  providerType?: StringFilter | string
  providerId?: StringFilter | string
  providerAccountId?: StringFilter | string
  refreshToken?: StringNullableFilter | string | null
  accessToken?: StringNullableFilter | string | null
  accessTokenExpires?: DateTimeNullableFilter | Date | string | null
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
}

export type AccountUpsertWithWhereUniqueWithoutUserInput = {
  where: AccountWhereUniqueInput
  update: AccountUpdateWithoutUserDataInput
  create: AccountCreateWithoutUserInput
}

export type SessionUpdateWithWhereUniqueWithoutUserInput = {
  where: SessionWhereUniqueInput
  data: SessionUpdateWithoutUserDataInput
}

export type SessionUpdateManyWithWhereNestedInput = {
  where: SessionScalarWhereInput
  data: SessionUpdateManyDataInput
}

export type SessionScalarWhereInput = {
  AND?: SessionScalarWhereInput | Enumerable<SessionScalarWhereInput>
  OR?: SessionScalarWhereInput | Enumerable<SessionScalarWhereInput>
  NOT?: SessionScalarWhereInput | Enumerable<SessionScalarWhereInput>
  id?: IntFilter | number
  userId?: IntFilter | number
  expires?: DateTimeFilter | Date | string
  sessionToken?: StringFilter | string
  accessToken?: StringFilter | string
  createdAt?: DateTimeFilter | Date | string
  updatedAt?: DateTimeFilter | Date | string
}

export type SessionUpsertWithWhereUniqueWithoutUserInput = {
  where: SessionWhereUniqueInput
  update: SessionUpdateWithoutUserDataInput
  create: SessionCreateWithoutUserInput
}

export type ArtistCreateWithoutSongsInput = {
  name: string
  genre?: string | null
}

export type PlaylistCreateWithoutSongsInput = {
  name: string
}

export type ArtistUpdateWithoutSongsDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  genre?: string | NullableStringFieldUpdateOperationsInput | null
}

export type ArtistUpsertWithoutSongsInput = {
  update: ArtistUpdateWithoutSongsDataInput
  create: ArtistCreateWithoutSongsInput
}

export type PlaylistUpdateWithoutSongsDataInput = {
  name?: string | StringFieldUpdateOperationsInput
}

export type PlaylistUpsertWithoutSongsInput = {
  update: PlaylistUpdateWithoutSongsDataInput
  create: PlaylistCreateWithoutSongsInput
}

export type SongCreateWithoutArtistInput = {
  name: string
  youtubeId?: string | null
  albumCoverUrl?: string | null
  test?: string
  Playlist?: PlaylistCreateOneWithoutSongsInput
}

export type SongUpdateWithWhereUniqueWithoutArtistInput = {
  where: SongWhereUniqueInput
  data: SongUpdateWithoutArtistDataInput
}

export type SongUpdateManyWithWhereNestedInput = {
  where: SongScalarWhereInput
  data: SongUpdateManyDataInput
}

export type SongScalarWhereInput = {
  AND?: SongScalarWhereInput | Enumerable<SongScalarWhereInput>
  OR?: SongScalarWhereInput | Enumerable<SongScalarWhereInput>
  NOT?: SongScalarWhereInput | Enumerable<SongScalarWhereInput>
  id?: IntFilter | number
  name?: StringFilter | string
  youtubeId?: StringNullableFilter | string | null
  albumCoverUrl?: StringNullableFilter | string | null
  test?: StringFilter | string
  artistId?: IntNullableFilter | number | null
  playlistId?: IntNullableFilter | number | null
}

export type SongUpsertWithWhereUniqueWithoutArtistInput = {
  where: SongWhereUniqueInput
  update: SongUpdateWithoutArtistDataInput
  create: SongCreateWithoutArtistInput
}

export type SongCreateWithoutPlaylistInput = {
  name: string
  youtubeId?: string | null
  albumCoverUrl?: string | null
  test?: string
  artist?: ArtistCreateOneWithoutSongsInput
}

export type SongUpdateWithWhereUniqueWithoutPlaylistInput = {
  where: SongWhereUniqueInput
  data: SongUpdateWithoutPlaylistDataInput
}

export type SongUpsertWithWhereUniqueWithoutPlaylistInput = {
  where: SongWhereUniqueInput
  update: SongUpdateWithoutPlaylistDataInput
  create: SongCreateWithoutPlaylistInput
}

export type AccountUpdateWithoutUserDataInput = {
  providerType?: string | StringFieldUpdateOperationsInput
  providerId?: string | StringFieldUpdateOperationsInput
  providerAccountId?: string | StringFieldUpdateOperationsInput
  refreshToken?: string | NullableStringFieldUpdateOperationsInput | null
  accessToken?: string | NullableStringFieldUpdateOperationsInput | null
  accessTokenExpires?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type AccountUpdateManyDataInput = {
  providerType?: string | StringFieldUpdateOperationsInput
  providerId?: string | StringFieldUpdateOperationsInput
  providerAccountId?: string | StringFieldUpdateOperationsInput
  refreshToken?: string | NullableStringFieldUpdateOperationsInput | null
  accessToken?: string | NullableStringFieldUpdateOperationsInput | null
  accessTokenExpires?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type SessionUpdateWithoutUserDataInput = {
  expires?: Date | string | DateTimeFieldUpdateOperationsInput
  sessionToken?: string | StringFieldUpdateOperationsInput
  accessToken?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type SessionUpdateManyDataInput = {
  expires?: Date | string | DateTimeFieldUpdateOperationsInput
  sessionToken?: string | StringFieldUpdateOperationsInput
  accessToken?: string | StringFieldUpdateOperationsInput
  createdAt?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedAt?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type SongUpdateWithoutArtistDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  youtubeId?: string | NullableStringFieldUpdateOperationsInput | null
  albumCoverUrl?: string | NullableStringFieldUpdateOperationsInput | null
  test?: string | StringFieldUpdateOperationsInput
  Playlist?: PlaylistUpdateOneWithoutSongsInput
}

export type SongUpdateManyDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  youtubeId?: string | NullableStringFieldUpdateOperationsInput | null
  albumCoverUrl?: string | NullableStringFieldUpdateOperationsInput | null
  test?: string | StringFieldUpdateOperationsInput
}

export type SongUpdateWithoutPlaylistDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  youtubeId?: string | NullableStringFieldUpdateOperationsInput | null
  albumCoverUrl?: string | NullableStringFieldUpdateOperationsInput | null
  test?: string | StringFieldUpdateOperationsInput
  artist?: ArtistUpdateOneWithoutSongsInput
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
