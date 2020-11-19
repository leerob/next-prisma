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
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.1.1
 * Query Engine version: 34b761660584e32d715c3e86ecec3e2c4d50d0d9
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

export declare type TrueKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

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
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string, collectTimestamps?: any): Promise<T>;
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
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]> 

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

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Artists
 * const artists = await prisma.artist.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
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
   * // Fetch zero or more Artists
   * const artists = await prisma.artist.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  connect(): Promise<void>;
  /**
   * @private
   */
  private runDisconnect;
  /**
   * Disconnect from the database
   */
  disconnect(): Promise<any>;

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
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
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
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

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
   * `prisma.song`: Exposes CRUD operations for the **Song** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Songs
    * const songs = await prisma.song.findMany()
    * ```
    */
  get song(): SongDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const OrderByArg: {
  asc: 'asc',
  desc: 'desc'
};

export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg]



/**
 * Model Artist
 */

export type Artist = {
  id: number
  name: string
  genre: string | null
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
   * Find zero or one Artist.
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
   * Find zero or more Artists.
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
   * const user = await prisma.artist.create({
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
   * const user = await prisma.artist.delete({
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
   * 
   */
  count(args?: Omit<FindManyArtistArgs, 'select' | 'include'>): Promise<number>
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
  private _collectTimestamps?;
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
  orderBy?: ArtistOrderByInput
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
 * Model Song
 */

export type Song = {
  id: number
  name: string
  youtubeId: string | null
  albumCoverUrl: string | null
  artistId: number | null
}

export type SongSelect = {
  id?: boolean
  name?: boolean
  youtubeId?: boolean
  albumCoverUrl?: boolean
  artist?: boolean | ArtistArgs
  artistId?: boolean
}

export type SongInclude = {
  artist?: boolean | ArtistArgs
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
      ? ArtistGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Song ? Song[P]
: 
      P extends 'artist'
      ? ArtistGetPayload<S['select'][P]> | null : never
    }
  : Song
: Song


export interface SongDelegate {
  /**
   * Find zero or one Song.
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
   * Find zero or more Songs.
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
   * const user = await prisma.song.create({
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
   * const user = await prisma.song.delete({
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
   * 
   */
  count(args?: Omit<FindManySongArgs, 'select' | 'include'>): Promise<number>
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
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  artist<T extends ArtistArgs = {}>(args?: Subset<T, ArtistArgs>): CheckSelect<T, Prisma__ArtistClient<Artist | null>, Prisma__ArtistClient<ArtistGetPayload<T> | null>>;

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
  orderBy?: SongOrderByInput
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
 * Deep Input Types
 */


export type SongWhereInput = {
  id?: number | IntFilter
  name?: string | StringFilter
  youtubeId?: string | NullableStringFilter | null
  albumCoverUrl?: string | NullableStringFilter | null
  artistId?: number | NullableIntFilter | null
  AND?: Enumerable<SongWhereInput>
  OR?: Array<SongWhereInput>
  NOT?: Enumerable<SongWhereInput>
  artist?: ArtistWhereInput | null
}

export type ArtistWhereInput = {
  id?: number | IntFilter
  name?: string | StringFilter
  genre?: string | NullableStringFilter | null
  songs?: SongFilter | null
  AND?: Enumerable<ArtistWhereInput>
  OR?: Array<ArtistWhereInput>
  NOT?: Enumerable<ArtistWhereInput>
}

export type ArtistWhereUniqueInput = {
  id?: number
}

export type SongWhereUniqueInput = {
  id?: number
}

export type SongCreateWithoutArtistInput = {
  name: string
  youtubeId?: string | null
  albumCoverUrl?: string | null
}

export type SongCreateManyWithoutArtistInput = {
  create?: Enumerable<SongCreateWithoutArtistInput>
  connect?: Enumerable<SongWhereUniqueInput>
}

export type ArtistCreateInput = {
  name: string
  genre?: string | null
  songs?: SongCreateManyWithoutArtistInput | null
}

export type SongUpdateWithoutArtistDataInput = {
  id?: number
  name?: string
  youtubeId?: string | null
  albumCoverUrl?: string | null
}

export type SongUpdateWithWhereUniqueWithoutArtistInput = {
  where: SongWhereUniqueInput
  data: SongUpdateWithoutArtistDataInput
}

export type SongScalarWhereInput = {
  id?: number | IntFilter
  name?: string | StringFilter
  youtubeId?: string | NullableStringFilter | null
  albumCoverUrl?: string | NullableStringFilter | null
  artistId?: number | NullableIntFilter | null
  AND?: Enumerable<SongScalarWhereInput>
  OR?: Array<SongScalarWhereInput>
  NOT?: Enumerable<SongScalarWhereInput>
}

export type SongUpdateManyDataInput = {
  id?: number
  name?: string
  youtubeId?: string | null
  albumCoverUrl?: string | null
}

export type SongUpdateManyWithWhereNestedInput = {
  where: SongScalarWhereInput
  data: SongUpdateManyDataInput
}

export type SongUpsertWithWhereUniqueWithoutArtistInput = {
  where: SongWhereUniqueInput
  update: SongUpdateWithoutArtistDataInput
  create: SongCreateWithoutArtistInput
}

export type SongUpdateManyWithoutArtistInput = {
  create?: Enumerable<SongCreateWithoutArtistInput>
  connect?: Enumerable<SongWhereUniqueInput>
  set?: Enumerable<SongWhereUniqueInput>
  disconnect?: Enumerable<SongWhereUniqueInput>
  delete?: Enumerable<SongWhereUniqueInput>
  update?: Enumerable<SongUpdateWithWhereUniqueWithoutArtistInput>
  updateMany?: Enumerable<SongUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<SongScalarWhereInput>
  upsert?: Enumerable<SongUpsertWithWhereUniqueWithoutArtistInput>
}

export type ArtistUpdateInput = {
  id?: number
  name?: string
  genre?: string | null
  songs?: SongUpdateManyWithoutArtistInput
}

export type ArtistUpdateManyMutationInput = {
  id?: number
  name?: string
  genre?: string | null
}

export type ArtistCreateWithoutSongsInput = {
  name: string
  genre?: string | null
}

export type ArtistCreateOneWithoutSongsInput = {
  create?: ArtistCreateWithoutSongsInput
  connect?: ArtistWhereUniqueInput
}

export type SongCreateInput = {
  name: string
  youtubeId?: string | null
  albumCoverUrl?: string | null
  artist?: ArtistCreateOneWithoutSongsInput | null
}

export type ArtistUpdateWithoutSongsDataInput = {
  id?: number
  name?: string
  genre?: string | null
}

export type ArtistUpsertWithoutSongsInput = {
  update: ArtistUpdateWithoutSongsDataInput
  create: ArtistCreateWithoutSongsInput
}

export type ArtistUpdateOneWithoutSongsInput = {
  create?: ArtistCreateWithoutSongsInput
  connect?: ArtistWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: ArtistUpdateWithoutSongsDataInput
  upsert?: ArtistUpsertWithoutSongsInput
}

export type SongUpdateInput = {
  id?: number
  name?: string
  youtubeId?: string | null
  albumCoverUrl?: string | null
  artist?: ArtistUpdateOneWithoutSongsInput
}

export type SongUpdateManyMutationInput = {
  id?: number
  name?: string
  youtubeId?: string | null
  albumCoverUrl?: string | null
}

export type IntFilter = {
  equals?: number
  not?: number | IntFilter
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
}

export type StringFilter = {
  equals?: string
  not?: string | StringFilter
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
}

export type NullableStringFilter = {
  equals?: string | null
  not?: string | null | NullableStringFilter
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type NullableIntFilter = {
  equals?: number | null
  not?: number | null | NullableIntFilter
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number | null
  lte?: number | null
  gt?: number | null
  gte?: number | null
}

export type SongFilter = {
  every?: SongWhereInput
  some?: SongWhereInput
  none?: SongWhereInput
}

export type ArtistOrderByInput = {
  id?: OrderByArg | null
  name?: OrderByArg | null
  genre?: OrderByArg | null
}

export type SongOrderByInput = {
  id?: OrderByArg | null
  name?: OrderByArg | null
  youtubeId?: OrderByArg | null
  albumCoverUrl?: OrderByArg | null
  artistId?: OrderByArg | null
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
