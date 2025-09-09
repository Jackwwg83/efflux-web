#!/usr/bin/env node
import { createRequire } from "module"; const require = createRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/index.ts
import { parseArgs } from "node:util";

// ../../node_modules/.pnpm/zod@3.25.7/node_modules/zod/dist/esm/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// ../../node_modules/.pnpm/zod@3.25.7/node_modules/zod/dist/esm/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// ../../node_modules/.pnpm/zod@3.25.7/node_modules/zod/dist/esm/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// ../../node_modules/.pnpm/zod@3.25.7/node_modules/zod/dist/esm/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// ../../node_modules/.pnpm/zod@3.25.7/node_modules/zod/dist/esm/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// ../../node_modules/.pnpm/zod@3.25.7/node_modules/zod/dist/esm/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path: path2, errorMaps, issueData } = params;
  const fullPath = [...path2, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

// ../../node_modules/.pnpm/zod@3.25.7/node_modules/zod/dist/esm/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// ../../node_modules/.pnpm/zod@3.25.7/node_modules/zod/dist/esm/v3/types.js
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _ZodEnum_cache;
var _ZodNativeEnum_cache;
var ParseInputLazyPath = class {
  constructor(parent, value, path2, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path2;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex2 = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex2 = `${regex2}(${opts.join("|")})`;
  return new RegExp(`^${regex2}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex2 = datetimeRegex(check);
        if (!regex2.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex2 = dateRegex;
        if (!regex2.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex2 = timeRegex(check);
        if (!regex2.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex2, validation, message) {
    return this.refinement((data) => regex2.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex2, message) {
    return this._addCheck({
      kind: "regex",
      regex: regex2,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  constructor() {
    super(...arguments);
    _ZodEnum_cache.set(this, void 0);
  }
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f").has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
_ZodEnum_cache = /* @__PURE__ */ new WeakMap();
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  constructor() {
    super(...arguments);
    _ZodNativeEnum_cache.set(this, void 0);
  }
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f").has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
_ZodNativeEnum_cache = /* @__PURE__ */ new WeakMap();
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return base;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return base;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;

// src/shared.ts
var defaultPipePath = "/tmp/terragon-daemon.pipe";
var AIModelSchema = external_exports.enum([
  "opus",
  "sonnet",
  "gemini-2.5-pro",
  "amp",
  "gpt-5",
  "gpt-5-low",
  "gpt-5-high"
]);
var DaemonMessageClaudeSchema = external_exports.object({
  type: external_exports.literal("claude"),
  token: external_exports.string(),
  prompt: external_exports.string(),
  model: AIModelSchema,
  sessionId: external_exports.string().nullable(),
  threadId: external_exports.string(),
  featureFlags: external_exports.record(external_exports.string(), external_exports.boolean()).optional(),
  imagePaths: external_exports.array(external_exports.string()).optional(),
  pdfPaths: external_exports.array(external_exports.string()).optional(),
  permissionMode: external_exports.enum(["allowAll", "plan"]).optional()
});
var DaemonMessageKillSchema = external_exports.object({
  type: external_exports.literal("kill"),
  threadId: external_exports.null().optional(),
  token: external_exports.null().optional()
});
var DaemonMessageStopSchema = external_exports.object({
  type: external_exports.literal("stop"),
  threadId: external_exports.string(),
  token: external_exports.string()
});
var DaemonMessageSchema = external_exports.union([
  DaemonMessageClaudeSchema,
  DaemonMessageKillSchema,
  DaemonMessageStopSchema
]);

// src/daemon.ts
import { performance } from "node:perf_hooks";

// src/retry.ts
var DEFAULT_RETRY_CONFIG = {
  baseDelayMs: 1e3,
  maxDelayMs: 6e4,
  maxAttempts: 5,
  backoffMultiplier: 1.3,
  jitterFactor: 0.3
};
var RetryBackoff = class {
  constructor(config = DEFAULT_RETRY_CONFIG) {
    this.config = config;
  }
  retryState = {
    attempt: 0,
    lastAttemptTime: 0
  };
  /**
   * Calculate the next delay with exponential backoff and jitter
   */
  getRetryDelay(attempt) {
    const exponentialDelay = Math.min(
      this.config.baseDelayMs * Math.pow(this.config.backoffMultiplier, attempt - 1),
      this.config.maxDelayMs
    );
    const jitter = exponentialDelay * this.config.jitterFactor * Math.random();
    return Math.floor(exponentialDelay + jitter);
  }
  get retryAttempt() {
    return this.retryState.attempt;
  }
  reset() {
    this.retryState = {
      attempt: 0,
      lastAttemptTime: 0
    };
  }
  increment() {
    this.retryState.attempt++;
    this.retryState.lastAttemptTime = Date.now();
  }
  retryIn() {
    if (this.retryState.attempt === 0) {
      return null;
    }
    if (this.retryState.attempt >= this.config.maxAttempts) {
      return null;
    }
    return this.getRetryDelay(this.retryState.attempt);
  }
};

// src/claude.ts
import crypto from "node:crypto";

// ../../node_modules/.pnpm/nanoid@5.1.5/node_modules/nanoid/non-secure/index.js
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
var nanoid = (size = 21) => {
  let id = "";
  let i = size | 0;
  while (i--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
};

// src/claude.ts
function getAnthropicApiKeyOrNull(runtime) {
  const fallbackApiKey = process.env.ANTHROPIC_API_KEY ?? "";
  const cmd = "cd && test -f .claude/.credentials.json && echo 'EXISTS' || echo 'NOT_EXISTS'";
  if (runtime.execSync(cmd).trim() === "NOT_EXISTS") {
    return fallbackApiKey;
  }
  try {
    const homeDir = runtime.execSync("cd && pwd").trim();
    const credentials = runtime.readFileSync(
      `${homeDir}/.claude/.credentials.json`
    );
    const credentialsJSON = JSON.parse(credentials);
    if (credentialsJSON.anthropicApiKey) {
      runtime.logger.info("Using anthropicApiKey from credentials file.");
      return credentialsJSON.anthropicApiKey;
    }
    runtime.logger.info("Not setting ANTHROPIC_API_KEY.");
    return "";
  } catch (e) {
    runtime.logger.error("Error parsing credentials", { error: e });
    return fallbackApiKey;
  }
}
var toolUseErrorStr = "The user doesn't want to proceed with this tool use. The tool use was rejected (eg. if it was a file edit, the new_string was NOT written to the file). STOP what you are doing and wait for the user to tell you how to proceed.";
function isValidSessionId(runtime, sessionId) {
  try {
    const homeDir = runtime.execSync("cd && pwd").trim();
    const escapedSessionId = sessionId.replace(/[^a-zA-Z0-9._-]/g, "");
    const sessionLogFile = runtime.execSync(
      `find ${homeDir}/.claude/projects -name "${escapedSessionId}.jsonl"`
    ).trim();
    if (!sessionLogFile) {
      runtime.logger.warn("No session log file found for sessionId", {
        sessionId
      });
      return false;
    }
    return true;
  } catch (e) {
    runtime.logger.error("Error finding session log file", {
      sessionId
    });
  }
  return false;
}
function maybeFixLogsForSessionId(runtime, sessionId) {
  try {
    const homeDir = runtime.execSync("cd && pwd").trim();
    const escapedSessionId = sessionId.replace(/[^a-zA-Z0-9._-]/g, "");
    const sessionLogFile = runtime.execSync(
      `find ${homeDir}/.claude/projects -name "${escapedSessionId}.jsonl"`
    ).trim();
    if (!sessionLogFile) {
      runtime.logger.warn("No session log file found for sessionId", {
        sessionId
      });
      return;
    }
    const sessionLog = runtime.readFileSync(sessionLogFile);
    const sessionLogLines = sessionLog.split("\n").filter((line) => line.trim());
    const sessionLogLinesParsed = sessionLogLines.map((line) => {
      try {
        return JSON.parse(line);
      } catch (e) {
        return null;
      }
    }).filter(Boolean);
    let lastUuid = null;
    const lineByToolUseId = {};
    const toolUseIds = /* @__PURE__ */ new Set();
    const toolResultIds = /* @__PURE__ */ new Set();
    for (const line of sessionLogLinesParsed) {
      if (line.type === "assistant") {
        for (const part of line.message.content) {
          if (part.type === "tool_use") {
            toolUseIds.add(part.id);
            lineByToolUseId[part.id] = line;
          }
        }
      }
      if (line.type === "user") {
        for (const part of line.message.content) {
          if (part.type === "tool_result") {
            toolResultIds.add(part.tool_use_id);
          }
        }
      }
      lastUuid = line.uuid;
    }
    const toolUseIdsToFix = /* @__PURE__ */ new Set();
    for (const toolUseId of toolUseIds) {
      if (!toolResultIds.has(toolUseId)) {
        toolUseIdsToFix.add(toolUseId);
      }
    }
    if (toolUseIdsToFix.size === 0) {
      return;
    }
    runtime.logger.info("Fixing tool use ids", {
      toolUseIdsToFix: Array.from(toolUseIdsToFix)
    });
    const logLinesToAppend = [];
    for (const toolUseId of toolUseIdsToFix) {
      const line = lineByToolUseId[toolUseId];
      const uuid = crypto.randomUUID();
      logLinesToAppend.push({
        ...line,
        parentUuid: lastUuid,
        uuid,
        type: "user",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        message: {
          role: "user",
          content: [
            {
              type: "tool_result",
              content: toolUseErrorStr,
              is_error: true,
              tool_use_id: toolUseId
            }
          ]
        },
        toolUseResult: `Error: ${toolUseErrorStr}`
      });
      lastUuid = uuid;
    }
    runtime.logger.info(
      `Appending ${logLinesToAppend.length} lines to ${sessionLogFile}`
    );
    for (const line of logLinesToAppend) {
      runtime.appendFileSync(sessionLogFile, JSON.stringify(line) + "\n");
    }
    runtime.logger.info("Done fixing logs for sessionId", { sessionId });
  } catch (e) {
    runtime.logger.error("Error fixing logs for sessionId", {
      sessionId,
      error: e
    });
  }
}
function claudeCommand({
  runtime,
  prompt,
  sessionId,
  model,
  mcpConfigPath,
  permissionMode,
  enableMcpPermissionPrompt = false
}) {
  const tmpFileName = `/tmp/claude-prompt-${nanoid()}.txt`;
  runtime.writeFileSync(tmpFileName, prompt);
  let resumeOrContinueFlag = "";
  if (sessionId) {
    if (isValidSessionId(runtime, sessionId)) {
      resumeOrContinueFlag = `--resume ${sessionId}`;
    } else {
      runtime.logger.warn(
        "Using the continue flag instead because of invalid sessionId",
        {
          sessionId
        }
      );
      resumeOrContinueFlag = "--continue";
    }
  }
  const parts = [
    "cat",
    tmpFileName,
    "|",
    "claude",
    "-p",
    "--model",
    model,
    resumeOrContinueFlag,
    "--verbose",
    ...permissionMode === "plan" ? [
      "--permission-mode",
      "plan",
      "--allowedTools",
      "WebSearch",
      "WebFetch",
      "Read",
      "Bash"
    ] : ["--dangerously-skip-permissions"],
    "--output-format",
    "stream-json",
    ...mcpConfigPath ? ["--mcp-config", mcpConfigPath] : [],
    "--append-system-prompt",
    ...enableMcpPermissionPrompt ? ["--permission-prompt-tool", "mcp__terry__PermissionPrompt"] : [],
    `"${systemPrompt}"`
  ];
  return parts.join(" ");
}
var systemPrompt = `Your name is Terry and you are a coding agent that works for Terragon Labs. You can use the gh cli to interact with github. You are running as part of a system that might automatically commit and push changes to the remote for you. You can use the git commands to orient yourself.`;

// src/gemini.ts
function getGeminiApiKeyOrNull(_runtime) {
  return process.env.GEMINI_API_KEY ?? "";
}
function geminiCommand({
  runtime,
  prompt
}) {
  const tmpFileName = `/tmp/gemini-prompt-${nanoid()}.txt`;
  runtime.writeFileSync(tmpFileName, prompt);
  const parts = [
    "cat",
    tmpFileName,
    "|",
    "gemini",
    "--yolo",
    // Skip confirmation prompts
    "-p"
    // Prompt mode
  ];
  return parts.join(" ");
}

// src/github.ts
function getGithubToken(runtime) {
  try {
    const homeDir = runtime.execSync("cd && pwd").trim();
    const credentials = runtime.readFileSync(`${homeDir}/.git-credentials`);
    const lines = credentials.split("\n");
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("https://") && trimmedLine.includes("@github.com")) {
        const match = trimmedLine.match(/https:\/\/[^:]+:([^@]+)@github\.com/);
        if (match && match[1]) {
          return match[1];
        }
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

// src/utils.ts
function killProcessGroup(runtime, processId) {
  if (processId) {
    runtime.logger.info("Killing process group", { pid: processId });
    runtime.killChildProcessGroup(processId);
  }
}
function getCommonEnv(runtime) {
  return {
    ...process.env,
    GH_TOKEN: getGithubToken(runtime) ?? ""
  };
}
function createCommonHandlers(runtime, modelType) {
  return {
    onStderr: (line) => {
      runtime.logger.error(`${modelType} stderr`, { line });
    },
    onError: (error) => {
      runtime.logger.error(`${modelType} command error`, { error });
    }
  };
}
function createIdleWatchdog({
  timeoutMs,
  onTimeout,
  logger
}) {
  let timer = null;
  let fired = false;
  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  const reset = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(async () => {
      fired = true;
      try {
        await onTimeout();
      } catch (error) {
        logger?.error("Idle watchdog onTimeout error", { error });
      }
    }, timeoutMs);
  };
  const hasFired = () => fired;
  return { reset, clear, hasFired };
}

// src/amp.ts
var TOOL_CALL_MAPPINGS = {
  $: {
    claudeToolName: "Bash",
    transformParams: (ampParam) => ({ command: ampParam })
  },
  Glob: {
    claudeToolName: "Glob",
    transformParams: (ampParam) => {
      const match = ampParam.match(/^for\s+(.+)$/);
      if (match) {
        return { pattern: match[1].trim() };
      }
      return { pattern: ampParam };
    }
  }
  // Add more mappings as needed
};
function mapToolCall(toolName, toolParam) {
  const mapping = TOOL_CALL_MAPPINGS[toolName];
  if (mapping) {
    return {
      name: mapping.claudeToolName,
      input: mapping.transformParams(toolParam)
    };
  }
  return {
    name: toolName,
    input: { param: toolParam }
  };
}
function getAmpApiKeyOrNull(_runtime) {
  return process.env.AMP_API_KEY ?? "";
}
function ampCommand({
  runtime,
  prompt,
  sessionId
}) {
  const tmpFileName = `/tmp/amp-prompt-${nanoid()}.txt`;
  runtime.writeFileSync(tmpFileName, prompt);
  const parts = ["cat", tmpFileName, "|", "amp"];
  if (sessionId) {
    parts.push("threads continue", sessionId);
  }
  parts.push("--no-color", "--dangerously-allow-all");
  return parts.join(" ");
}
function processAmpMessagesForSending({
  entries,
  currentPrompt,
  runtime
}) {
  const result = entries.filter(
    (entry) => entry.message.type !== "assistant"
  );
  const assistantEntries = entries.filter(
    (entry) => entry.message.type === "assistant"
  );
  if (assistantEntries.length === 0) {
    return result;
  }
  const stdoutLines = assistantEntries.map((entry) => {
    const message = entry.message;
    return message.message.content;
  });
  let startIdxOfResponse = 0;
  if (currentPrompt) {
    const currentPromptLines = currentPrompt.split("\n").map((line) => `> ${line.trim()}`);
    if (currentPrompt) {
      for (let i2 = 0; i2 <= stdoutLines.length - currentPromptLines.length; i2++) {
        let foundMatch = true;
        for (let j = 0; j < currentPromptLines.length; j++) {
          if (stdoutLines[i2 + j].trim() !== currentPromptLines[j].trim()) {
            foundMatch = false;
            break;
          }
        }
        if (foundMatch) {
          startIdxOfResponse = i2 + currentPromptLines.length;
        }
      }
    }
    if (startIdxOfResponse === 0) {
      runtime.logger.warn("Failed to find start of response in AMP output", {
        stdoutLines: JSON.stringify(stdoutLines, null, 2),
        currentPromptLines: JSON.stringify(currentPromptLines, null, 2)
      });
    }
  }
  let threadId = assistantEntries[0].threadId;
  let token = assistantEntries[0].token;
  const responseLines = stdoutLines.slice(startIdxOfResponse);
  const processedEntries = [];
  let i = 0;
  let agentTextParts = [];
  while (i < responseLines.length) {
    const line = responseLines[i];
    if (line.startsWith("\u256D\u2500") && line.endsWith("\u2500\u256E")) {
      i++;
      if (i < responseLines.length) {
        const toolLine = responseLines[i];
        const toolMatch = toolLine.match(/^│\s([^\s]+)\s+(.+?)│$/);
        if (toolMatch) {
          const toolName = toolMatch[1];
          const toolParam = toolMatch[2].trimEnd();
          i++;
          if (i < responseLines.length && responseLines[i].startsWith("\u251C\u2500")) {
            i++;
          }
          const contentLines = [];
          while (i < responseLines.length) {
            const contentLine = responseLines[i];
            if (contentLine.startsWith("\u2570\u2500") && contentLine.endsWith("\u2500\u256F")) {
              break;
            }
            const contentMatch = contentLine.match(/^│\s(.*)│$/);
            if (contentMatch) {
              contentLines.push(contentMatch[1].trimEnd());
            }
            i++;
          }
          if (agentTextParts.length > 0) {
            processedEntries.push({
              message: {
                type: "assistant",
                message: {
                  role: "assistant",
                  content: [...agentTextParts]
                },
                parent_tool_use_id: null,
                session_id: ""
              },
              agent: "amp",
              threadId,
              token
            });
            agentTextParts = [];
          }
          const mappedTool = mapToolCall(toolName, toolParam);
          if (!mappedTool) {
            runtime.logger.warn("Failed to map tool call", {
              toolName,
              toolParam
            });
            i++;
            continue;
          }
          const toolUseId = `tool-use-${nanoid()}`;
          processedEntries.push({
            message: {
              type: "assistant",
              message: {
                role: "assistant",
                content: [
                  {
                    type: "tool_use",
                    name: mappedTool.name,
                    input: mappedTool.input,
                    id: toolUseId
                  }
                ]
              },
              parent_tool_use_id: null,
              session_id: ""
            },
            agent: "amp",
            threadId,
            token
          });
          processedEntries.push({
            message: {
              type: "user",
              message: {
                role: "user",
                content: [
                  {
                    type: "tool_result",
                    tool_use_id: toolUseId,
                    content: contentLines.join("\n")
                  }
                ]
              },
              parent_tool_use_id: null,
              session_id: ""
            },
            agent: "amp",
            threadId,
            token
          });
        }
      }
      i++;
      continue;
    }
    if (line.startsWith("Thread: https://ampcode.com/threads/")) {
      const threadMatch = line.match(
        /Thread: https:\/\/ampcode\.com\/threads\/(T-[a-zA-Z0-9-]+)/
      );
      if (threadMatch && i + 1 < responseLines.length) {
        const sessionId = threadMatch[1];
        const nextLine = responseLines[i + 1];
        if (nextLine.startsWith("Continue this thread with:")) {
          if (agentTextParts.length > 0) {
            processedEntries.push({
              message: {
                type: "assistant",
                message: {
                  role: "assistant",
                  content: [...agentTextParts]
                },
                parent_tool_use_id: null,
                session_id: ""
              },
              agent: "amp",
              threadId,
              token
            });
            agentTextParts = [];
          }
          processedEntries.push({
            message: {
              type: "system",
              subtype: "metadata",
              content: `${line}
${nextLine}`,
              session_id: sessionId
            },
            agent: "amp",
            threadId,
            token
          });
          i++;
        } else {
          agentTextParts.push({ type: "text", text: line });
        }
      } else {
        agentTextParts.push({ type: "text", text: line });
      }
      i++;
      continue;
    }
    if (line === "" || line === "Shutting down...") {
      i++;
      continue;
    }
    agentTextParts.push({ type: "text", text: line });
    i++;
  }
  if (agentTextParts.length > 0) {
    processedEntries.push({
      message: {
        type: "assistant",
        message: {
          role: "assistant",
          content: agentTextParts
        },
        parent_tool_use_id: null,
        session_id: ""
      },
      agent: "amp",
      threadId,
      token
    });
  }
  return [...processedEntries, ...result];
}

// src/codex.ts
function getOpenAIApiKeyOrNull(_runtime) {
  return process.env.OPENAI_API_KEY ?? "";
}
function codexCommand({
  runtime,
  prompt,
  model,
  imagePaths = []
}) {
  const tmpFileName = `/tmp/codex-prompt-${nanoid()}.txt`;
  runtime.writeFileSync(tmpFileName, prompt);
  let command = `cat ${tmpFileName} | codex exec --dangerously-bypass-approvals-and-sandbox --json`;
  switch (model) {
    case "gpt-5-low":
      command += ` --model gpt-5 --config model_reasoning_effort=low`;
      break;
    case "gpt-5-high":
      command += ` --model gpt-5 --config model_reasoning_effort=high`;
      break;
    case "gpt-5":
    default:
      command += ` --model gpt-5`;
      break;
  }
  if (imagePaths.length > 0) {
    const imageFlags = imagePaths.map((path2) => `--image "${path2}"`).join(" ");
    command += ` ${imageFlags}`;
  }
  return command;
}
function parseUnifiedDiff(unifiedDiff) {
  const lines = unifiedDiff.split("\n");
  const oldLines = [];
  const newLines = [];
  for (const line of lines) {
    if (line.startsWith("@@")) continue;
    if (line.startsWith("-")) {
      oldLines.push(line.substring(1));
    } else if (line.startsWith("+")) {
      newLines.push(line.substring(1));
    } else if (line.startsWith(" ")) {
      const contextLine = line.substring(1);
      oldLines.push(contextLine);
      newLines.push(contextLine);
    } else if (line.length > 0) {
      oldLines.push(line);
      newLines.push(line);
    }
  }
  return {
    oldContent: oldLines.join("\n"),
    newContent: newLines.join("\n")
  };
}
function processCodexMessagesForSending({
  entries,
  runtime
}) {
  const result = [];
  const processedEntries = [];
  const nonAssistantEntries = entries.filter(
    (entry) => entry.message.type !== "assistant"
  );
  result.push(...nonAssistantEntries);
  const assistantEntries = entries.filter(
    (entry) => entry.message.type === "assistant"
  );
  if (assistantEntries.length === 0) {
    return result;
  }
  let threadId = assistantEntries[0].threadId;
  let token = assistantEntries[0].token;
  let agentTextParts = [];
  const agentPartsToContentBlocks = (parts) => {
    return parts.map((part) => {
      if (part.type === "text") {
        return { type: "text", text: part.text };
      }
      return {
        type: "thinking",
        thinking: part.thinking,
        signature: "codex-synthetic-signature"
      };
    });
  };
  const maybeAccumulateAgentText = () => {
    if (agentTextParts.length > 0) {
      processedEntries.push({
        message: {
          type: "assistant",
          message: {
            role: "assistant",
            content: agentPartsToContentBlocks(agentTextParts)
          },
          parent_tool_use_id: null,
          session_id: ""
        },
        agent: "codex",
        threadId,
        token
      });
      agentTextParts = [];
    }
  };
  for (const entry of assistantEntries) {
    const message = entry.message;
    const content = message.message.content;
    let codexMsg = null;
    try {
      codexMsg = JSON.parse(content);
    } catch (e) {
      agentTextParts.push({ type: "text", text: content });
      continue;
    }
    if (!codexMsg || !codexMsg.msg) {
      continue;
    }
    switch (codexMsg.msg.type) {
      case "exec_command_begin": {
        maybeAccumulateAgentText();
        const command = codexMsg.msg.command ? codexMsg.msg.command.join(" ") : "";
        const toolUseId = codexMsg.msg.call_id || `tool-use-${nanoid()}`;
        processedEntries.push({
          message: {
            type: "assistant",
            message: {
              role: "assistant",
              content: [
                {
                  type: "tool_use",
                  name: "Bash",
                  input: { command, description: `Execute: ${command}` },
                  id: toolUseId
                }
              ]
            },
            parent_tool_use_id: null,
            session_id: ""
          },
          agent: "codex",
          threadId,
          token
        });
        break;
      }
      case "exec_command_end": {
        const toolUseId = codexMsg.msg.call_id || `tool-use-${nanoid()}`;
        const stdout = codexMsg.msg.stdout || "";
        const stderr = codexMsg.msg.stderr || "";
        const exitCode = codexMsg.msg.exit_code ?? 0;
        let content2 = stdout;
        let isError = false;
        if (stderr) {
          content2 += (content2 ? "\n" : "") + `Error: ${stderr}`;
        }
        if (exitCode !== 0) {
          content2 += (content2 ? "\n" : "") + `Exit code: ${exitCode}`;
          isError = true;
        }
        processedEntries.push({
          message: {
            type: "user",
            message: {
              role: "user",
              content: [
                {
                  type: "tool_result",
                  tool_use_id: toolUseId,
                  content: content2 || "Command completed",
                  is_error: isError
                }
              ]
            },
            parent_tool_use_id: null,
            session_id: ""
          },
          agent: "codex",
          threadId,
          token
        });
        break;
      }
      case "patch_apply_begin": {
        maybeAccumulateAgentText();
        const toolUseId = codexMsg.msg.call_id || `tool-use-${nanoid()}`;
        const changes = codexMsg.msg.changes || {};
        const filePaths = Object.keys(changes);
        if (filePaths.length > 0) {
          const filePath = filePaths[0];
          const change = changes[filePath];
          if (change && change.update && change.update.unified_diff) {
            const diff = change.update.unified_diff;
            const parsedDiff = parseUnifiedDiff(diff);
            processedEntries.push({
              message: {
                type: "assistant",
                message: {
                  role: "assistant",
                  content: [
                    {
                      type: "tool_use",
                      name: "Edit",
                      input: {
                        file_path: filePath,
                        description: `Apply patch to ${filePath}`,
                        old_string: parsedDiff.oldContent,
                        new_string: parsedDiff.newContent
                      },
                      id: toolUseId
                    }
                  ]
                },
                parent_tool_use_id: null,
                session_id: ""
              },
              agent: "codex",
              threadId,
              token
            });
          }
        }
        break;
      }
      case "patch_apply_end": {
        const toolUseId = codexMsg.msg.call_id || `tool-use-${nanoid()}`;
        const stdout = codexMsg.msg.stdout || "";
        const success = codexMsg.msg.success ?? false;
        processedEntries.push({
          message: {
            type: "user",
            message: {
              role: "user",
              content: [
                {
                  type: "tool_result",
                  tool_use_id: toolUseId,
                  content: success ? stdout : `Failed: ${stdout}`,
                  is_error: !success
                }
              ]
            },
            parent_tool_use_id: null,
            session_id: ""
          },
          agent: "codex",
          threadId,
          token
        });
        break;
      }
      case "agent_message": {
        const msgContent = codexMsg.msg.message || "";
        agentTextParts.push({ type: "text", text: msgContent });
        break;
      }
      case "agent_reasoning": {
        const reasoning = codexMsg.msg.text || "";
        agentTextParts.push({ type: "thinking", thinking: reasoning });
        break;
      }
      case "token_count": {
        runtime.logger.debug("Codex token usage", {
          input_tokens: codexMsg.msg.input_tokens,
          output_tokens: codexMsg.msg.output_tokens,
          total_tokens: codexMsg.msg.total_tokens
        });
        break;
      }
      case "task_started": {
        processedEntries.push({
          message: {
            type: "system",
            subtype: "init",
            session_id: "",
            tools: [],
            mcp_servers: []
          },
          agent: "codex",
          threadId,
          token
        });
        break;
      }
      case "mcp_tool_call_begin": {
        maybeAccumulateAgentText();
        const toolUseId = codexMsg.msg.call_id || `tool-use-${nanoid()}`;
        const invocation = codexMsg.msg.invocation || {};
        const server = invocation.server || "";
        const tool = invocation.tool || "";
        const args = invocation.arguments || {};
        processedEntries.push({
          message: {
            type: "assistant",
            message: {
              role: "assistant",
              content: [
                {
                  type: "tool_use",
                  name: `mcp__${server}__${tool}`,
                  input: args,
                  id: toolUseId
                }
              ]
            },
            parent_tool_use_id: null,
            session_id: ""
          },
          agent: "codex",
          threadId,
          token
        });
        break;
      }
      case "mcp_tool_call_end": {
        const toolUseId = codexMsg.msg.call_id || `tool-use-${nanoid()}`;
        const result2 = codexMsg.msg.result || {};
        let content2 = "";
        if (result2.Ok) {
          const okContent = result2.Ok.content;
          if (Array.isArray(okContent)) {
            content2 = okContent.map((item) => {
              if (typeof item === "string") return item;
              if (item.text) return item.text;
              if (item.type === "text" && item.text) return item.text;
              return JSON.stringify(item);
            }).join("\n");
          } else if (typeof okContent === "string") {
            content2 = okContent;
          } else {
            content2 = JSON.stringify(okContent);
          }
        } else if (result2.Err) {
          content2 = `Error: ${JSON.stringify(result2.Err)}`;
        } else {
          content2 = JSON.stringify(result2);
        }
        processedEntries.push({
          message: {
            type: "user",
            message: {
              role: "user",
              content: [
                {
                  type: "tool_result",
                  tool_use_id: toolUseId,
                  content: content2 || "Tool completed",
                  is_error: !result2.Ok
                }
              ]
            },
            parent_tool_use_id: null,
            session_id: ""
          },
          agent: "codex",
          threadId,
          token
        });
        break;
      }
      case "error": {
        const errorMessage = codexMsg.msg.message || "An error occurred";
        if (errorMessage.includes("MCP client for")) {
          console.log("Skipping MCP client error", errorMessage);
          break;
        }
        processedEntries.push({
          message: {
            type: "result",
            subtype: "success",
            result: "Codex error: " + (codexMsg.msg.message || "An error occurred"),
            is_error: true,
            num_turns: 1,
            session_id: "",
            total_cost_usd: 0,
            duration_ms: 0,
            duration_api_ms: 0
          },
          agent: "codex",
          threadId,
          token
        });
        return [...processedEntries, ...result];
      }
      default: {
        runtime.logger.warn("Unknown Codex message type", {
          type: codexMsg.msg.type,
          msg: codexMsg.msg
        });
      }
    }
  }
  maybeAccumulateAgentText();
  return [...processedEntries, ...result];
}

// src/agent-frontmatter.ts
import fs from "node:fs";
import path from "node:path";
var AgentFrontmatterReader = class {
  constructor(runtime) {
    this.runtime = runtime;
  }
  agentProperties = /* @__PURE__ */ new Map();
  async loadAgents() {
    const agentsDir = path.join(process.cwd(), ".claude", "agents");
    this.runtime.logger.info("Starting agent frontmatter loading", {
      directory: agentsDir,
      cwd: process.cwd()
    });
    try {
      if (!fs.existsSync(agentsDir)) {
        this.runtime.logger.info(
          "No .claude/agents directory found, skipping agent loading",
          {
            checkedPath: agentsDir
          }
        );
        return;
      }
      const files = fs.readdirSync(agentsDir);
      const markdownFiles = files.filter((file) => file.endsWith(".md"));
      this.runtime.logger.info("Found agent files", {
        totalFiles: files.length,
        markdownFiles: markdownFiles.length,
        files: markdownFiles
      });
      for (const file of markdownFiles) {
        const filePath = path.join(agentsDir, file);
        this.runtime.logger.info("Processing agent file", {
          file,
          filePath
        });
        try {
          const content = fs.readFileSync(filePath, "utf-8");
          const data = this.parseFrontmatter(content);
          this.runtime.logger.info("Parsed frontmatter", {
            file,
            hasName: !!data.name,
            hasDescription: !!data.description,
            hasColor: !!data.color
          });
          if (data.name && data.description) {
            const agentProps = {
              name: data.name,
              description: data.description,
              color: data.color
            };
            this.agentProperties.set(data.name, agentProps);
            this.runtime.logger.info(
              "Successfully loaded agent from frontmatter",
              {
                name: data.name,
                color: data.color || "(no color)",
                descriptionLength: data.description.length,
                file
              }
            );
          } else {
            this.runtime.logger.warn("Agent file missing required fields", {
              file,
              hasName: !!data.name,
              hasDescription: !!data.description
            });
          }
        } catch (error) {
          this.runtime.logger.error("Failed to read or parse agent file", {
            file,
            error: error instanceof Error ? error.message : String(error),
            errorType: error instanceof Error ? error.constructor.name : typeof error
          });
        }
      }
      this.runtime.logger.info("Agent loading complete", {
        agentCount: this.agentProperties.size,
        agents: Array.from(this.agentProperties.keys())
      });
    } catch (error) {
      this.runtime.logger.error("Failed to load agents", { error });
    }
  }
  getAgentProperties(agentName) {
    return this.agentProperties.get(agentName);
  }
  getAllAgents() {
    return this.agentProperties;
  }
  parseFrontmatter(content) {
    const result = {};
    if (!content.startsWith("---")) {
      return result;
    }
    let endIndex = content.indexOf("\n---\n", 4);
    if (endIndex === -1) {
      const endPattern = "\n---";
      if (content.endsWith(endPattern)) {
        endIndex = content.length - endPattern.length;
      } else {
        return result;
      }
    }
    const frontmatterContent = content.substring(4, endIndex);
    const nameMatch = frontmatterContent.match(/^name:\s*(.+)$/m);
    if (nameMatch) {
      result.name = nameMatch[1].trim();
    }
    const descriptionMatch = frontmatterContent.match(/^description:\s*(.+)$/m);
    if (descriptionMatch) {
      result.description = descriptionMatch[1].trim();
    }
    const colorMatch = frontmatterContent.match(/^color:\s*(.+)$/m);
    if (colorMatch) {
      result.color = colorMatch[1].trim().replace(/^["']|["']$/g, "").toLowerCase();
    }
    return result;
  }
};

// src/daemon.ts
var TerragonDaemon = class {
  startTime = 0;
  messageBuffer = [];
  runtime;
  mcpConfigPath;
  activeProcessId = null;
  activeCommandStartTime = 0;
  activeClaudeSessionId = null;
  isStoppingActiveProcess = false;
  ampCurrentPrompt = null;
  claudeHasReceivedResultMessage = false;
  messageFlushDelay = 0;
  messageFlushTimer = null;
  uptimeReportingInterval = 0;
  uptimeReportingTimer = null;
  isFlushInProgress = false;
  pendingFlushRequired = false;
  retryBackoff;
  featureFlags = {};
  agentFrontmatterReader;
  constructor({
    messageFlushDelay = 1e3,
    uptimeReportingInterval = 5e3,
    runtime,
    retryConfig = DEFAULT_RETRY_CONFIG,
    mcpConfigPath
  }) {
    this.startTime = performance.now();
    this.runtime = runtime;
    this.messageFlushDelay = messageFlushDelay;
    this.uptimeReportingInterval = uptimeReportingInterval;
    this.retryBackoff = new RetryBackoff(retryConfig);
    this.mcpConfigPath = mcpConfigPath;
    this.agentFrontmatterReader = new AgentFrontmatterReader(runtime);
    const envFeatureFlags = process.env.TERRAGON_FEATURE_FLAGS;
    if (envFeatureFlags) {
      try {
        this.featureFlags = JSON.parse(envFeatureFlags);
        this.runtime.logger.info("Feature flags loaded from environment", {
          featureFlags: this.featureFlags
        });
      } catch (error) {
        this.runtime.logger.error(
          "Failed to parse feature flags from environment",
          {
            error,
            envFeatureFlags
          }
        );
      }
    }
  }
  /**
   * Initialize and start the daemon
   */
  async start() {
    this.runtime.logger.info("\u{1F680} Starting Terragon Daemon...");
    this.runtime.logger.info("Server URL configured", {
      url: this.runtime.url
    });
    this.runtime.logger.info("Named pipe configured", {
      pipePath: this.runtime.pipePath
    });
    this.runtime.logger.info("MCP config path configured", {
      mcpConfigPath: this.mcpConfigPath ?? null
    });
    await this.agentFrontmatterReader.loadAgents();
    await this.runtime.listenToNamedPipe(this.handlePipeMessage.bind(this));
    this.runtime.logger.info(
      "\u2705 Daemon started successfully, waiting for messages..."
    );
    this.uptimeReportingTimer = setInterval(() => {
      const uptime = Math.round((performance.now() - this.startTime) / 1e3);
      this.runtime.logger.info("Daemon Heartbeat", {
        uptime: `${uptime}s`
      });
    }, this.uptimeReportingInterval);
    this.runtime.onTeardown(this.teardown.bind(this));
  }
  getCurrentTimezone() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (error) {
      this.runtime.logger.error(
        "Failed to get current timezone. Falling back to UTC.",
        { error }
      );
      return "UTC";
    }
  }
  /**
   * Handle incoming message from the named pipe
   */
  async handlePipeMessage(message) {
    try {
      this.runtime.logger.info("Received pipe message", { message });
      const jsonObj = JSON.parse(message);
      const parsedMessage = DaemonMessageSchema.parse(jsonObj);
      if (parsedMessage.type === "kill") {
        this.runtime.logger.info("Killing daemon");
        this.killActiveProcess();
        if (process.env.NODE_ENV !== "test") {
          process.exit(0);
        }
        return;
      }
      if (parsedMessage.type === "stop") {
        this.runtime.logger.info(
          "Stop message received, killing active process..."
        );
        this.isStoppingActiveProcess = true;
        this.killActiveProcess();
        const duration_ms = Math.round(
          Date.now() - this.activeCommandStartTime
        );
        this.addMessageToBuffer({
          agent: null,
          message: {
            type: "custom-stop",
            session_id: null,
            duration_ms
          },
          threadId: parsedMessage.threadId,
          token: parsedMessage.token
        });
        await this.flushMessageBuffer();
        return;
      }
      await this.runCommand(parsedMessage);
    } catch (error) {
      console.error(error);
      this.runtime.logger.error("Failed to process pipe message", { error });
    }
  }
  killActiveProcess() {
    if (this.activeProcessId) {
      this.runtime.logger.info("Killing active process", {
        pid: this.activeProcessId
      });
      killProcessGroup(this.runtime, this.activeProcessId);
      this.activeProcessId = null;
      if (this.activeClaudeSessionId) {
        this.runtime.logger.info("Cleaning up claude session logs", {
          session: this.activeClaudeSessionId
        });
        maybeFixLogsForSessionId(this.runtime, this.activeClaudeSessionId);
      }
      this.activeClaudeSessionId = null;
    }
  }
  async runCommand(input) {
    this.isStoppingActiveProcess = false;
    this.activeCommandStartTime = Date.now();
    if (input.featureFlags) {
      this.featureFlags = input.featureFlags;
      this.runtime.logger.info("Feature flags updated", {
        featureFlags: this.featureFlags
      });
    }
    switch (input.model) {
      case "opus":
      case "sonnet":
        await this.runClaudeCommand(input);
        break;
      case "gemini-2.5-pro":
        await this.runGeminiCommand(input);
        break;
      case "amp":
        await this.runAmpCommand(input);
        break;
      case "gpt-5":
      case "gpt-5-low":
      case "gpt-5-high":
        await this.runCodexCommand(input);
        break;
      default:
        const _exhaustiveCheck = input.model;
        console.error("Unknown model", { model: _exhaustiveCheck });
        return this.runClaudeCommand(input);
    }
  }
  /**
   * Run the Claude command and process its output
   */
  async runClaudeCommand(input) {
    this.claudeHasReceivedResultMessage = false;
    if (input.prompt.trim() === "/test-prompt-too-long") {
      this.runtime.logger.info("Test command detected: /test-prompt-too-long");
      this.addMessageToBuffer({
        agent: "claudeCode",
        message: {
          type: "system",
          subtype: "init",
          session_id: "test-prompt-too-long-session",
          tools: [],
          mcp_servers: []
        },
        threadId: input.threadId,
        token: input.token
      });
      this.addMessageToBuffer({
        agent: "claudeCode",
        message: {
          type: "result",
          subtype: "success",
          result: "input length and max_tokens exceed context limit",
          is_error: true,
          duration_ms: 100,
          duration_api_ms: 100,
          total_cost_usd: 0,
          num_turns: 0,
          session_id: "test-prompt-too-long-session"
        },
        threadId: input.threadId,
        token: input.token
      });
      await this.flushMessageBuffer();
      return;
    }
    return new Promise((resolve) => {
      this.killActiveProcess();
      if (input.sessionId) {
        maybeFixLogsForSessionId(this.runtime, input.sessionId);
      }
      const command = claudeCommand({
        runtime: this.runtime,
        prompt: input.prompt,
        sessionId: input.sessionId,
        model: input.model,
        mcpConfigPath: this.mcpConfigPath ?? null,
        permissionMode: input.permissionMode,
        enableMcpPermissionPrompt: this.getFeatureFlag("mcpPermissionPrompt")
      });
      this.runtime.logger.info("Running Claude command", { command });
      const commonEnv = getCommonEnv(this.runtime);
      const claudeProcessId = this.runtime.spawnCommandLine(command, {
        env: {
          ...commonEnv,
          ANTHROPIC_API_KEY: getAnthropicApiKeyOrNull(this.runtime),
          BASH_MAX_TIMEOUT_MS: (60 * 1e3).toString()
        },
        onStdoutLine: (line) => {
          this.runtime.logger.debug("Claude output", { line });
          if (line) {
            try {
              const outputMessage = JSON.parse(line);
              if (outputMessage.session_id) {
                this.activeClaudeSessionId = outputMessage.session_id;
              }
              if (outputMessage.type === "result") {
                this.claudeHasReceivedResultMessage = true;
              }
              this.addMessageToBuffer({
                agent: "claudeCode",
                message: outputMessage,
                threadId: input.threadId,
                token: input.token
              });
            } catch (e) {
              this.runtime.logger.error("Failed to parse Claude output line", {
                line,
                error: e
              });
            }
          }
        },
        ...createCommonHandlers(this.runtime, "Claude"),
        onClose: (code) => {
          this.runtime.logger.info("Claude command finished", {
            exitCode: code
          });
          if (this.activeProcessId === claudeProcessId) {
            this.activeProcessId = null;
          }
          if (code !== 0 && !this.isStoppingActiveProcess && !this.claudeHasReceivedResultMessage) {
            const duration_ms = Math.round(
              Date.now() - this.activeCommandStartTime
            );
            this.addMessageToBuffer({
              agent: "claudeCode",
              message: {
                type: "custom-error",
                session_id: null,
                duration_ms
              },
              threadId: input.threadId,
              token: input.token
            });
          }
          this.flushMessageBuffer();
          resolve();
        }
      });
      this.runtime.logger.info("Spawned Claude process", {
        processId: claudeProcessId
      });
      if (claudeProcessId) {
        this.activeProcessId = claudeProcessId;
      }
    });
  }
  async runAmpCommand(input) {
    this.ampCurrentPrompt = input.prompt;
    return new Promise((resolve) => {
      this.killActiveProcess();
      const command = ampCommand({
        runtime: this.runtime,
        prompt: input.prompt,
        sessionId: input.sessionId
      });
      this.runtime.logger.info("Running Amp command", { command });
      const ampProcessId = this.runtime.spawnCommandLine(command, {
        env: {
          ...getCommonEnv(this.runtime),
          AMP_API_KEY: getAmpApiKeyOrNull(this.runtime)
        },
        onStdoutLine: (line) => {
          this.runtime.logger.debug("Amp output", { line });
          if (line) {
            this.addMessageToBuffer({
              agent: "amp",
              message: {
                type: "assistant",
                message: {
                  role: "assistant",
                  content: line
                },
                parent_tool_use_id: null,
                session_id: ""
              },
              threadId: input.threadId,
              token: input.token
            });
          }
        },
        ...createCommonHandlers(this.runtime, "Amp"),
        onClose: (code) => {
          this.runtime.logger.info("Amp command finished", {
            exitCode: code
          });
          if (this.activeProcessId === ampProcessId) {
            this.activeProcessId = null;
          }
          const duration_ms = Math.round(
            Date.now() - this.activeCommandStartTime
          );
          if (code !== 0 && !this.isStoppingActiveProcess) {
            this.addMessageToBuffer({
              agent: "amp",
              message: {
                type: "custom-error",
                session_id: null,
                duration_ms
              },
              threadId: input.threadId,
              token: input.token
            });
          }
          if (code === 0) {
            this.addMessageToBuffer({
              agent: "amp",
              message: {
                type: "result",
                subtype: "success",
                total_cost_usd: 0,
                duration_ms,
                duration_api_ms: duration_ms,
                is_error: false,
                num_turns: 1,
                result: "",
                session_id: ""
              },
              threadId: input.threadId,
              token: input.token
            });
          }
          this.flushMessageBuffer();
          resolve();
        }
      });
      this.runtime.logger.info("Spawned Amp process", {
        processId: ampProcessId
      });
      if (ampProcessId) {
        this.activeProcessId = ampProcessId;
      }
    });
  }
  /**
   * Run the Codex command and process its output
   */
  async runCodexCommand(input) {
    return new Promise((resolve) => {
      this.killActiveProcess();
      const command = codexCommand({
        runtime: this.runtime,
        prompt: input.prompt,
        model: input.model,
        imagePaths: input.imagePaths
      });
      this.runtime.logger.info("Running Codex command", { command });
      const watchdogTimeoutMs = (() => {
        const v = process.env.CODEX_IDLE_TIMEOUT_MS;
        const n = v ? Number(v) : NaN;
        return Number.isFinite(n) && n > 0 ? n : 15 * 60 * 1e3;
      })();
      const watchdog = createIdleWatchdog({
        timeoutMs: watchdogTimeoutMs,
        logger: this.runtime.logger,
        onTimeout: async () => {
          const duration_ms = Math.round(
            Date.now() - this.activeCommandStartTime
          );
          this.runtime.logger.warn(
            "Codex idle timeout reached, killing process",
            { watchdogTimeoutMs, duration_ms }
          );
          this.addMessageToBuffer({
            agent: "codex",
            message: {
              type: "result",
              subtype: "success",
              total_cost_usd: 0,
              duration_ms,
              duration_api_ms: duration_ms,
              is_error: true,
              num_turns: 1,
              result: `Codex error: no output for ${watchdogTimeoutMs / 1e3}s; process killed`,
              session_id: ""
            },
            threadId: input.threadId,
            token: input.token
          });
          this.killActiveProcess();
          await this.flushMessageBuffer();
        }
      });
      const codexProcessId = this.runtime.spawnCommandLine(command, {
        env: {
          ...getCommonEnv(this.runtime),
          OPENAI_API_KEY: getOpenAIApiKeyOrNull(this.runtime)
        },
        onStdoutLine: (line) => {
          this.runtime.logger.debug("Codex output", { line });
          if (line) {
            watchdog.reset();
            this.addMessageToBuffer({
              agent: "codex",
              message: {
                type: "assistant",
                message: {
                  role: "assistant",
                  content: line
                },
                parent_tool_use_id: null,
                session_id: ""
              },
              threadId: input.threadId,
              token: input.token
            });
          }
        },
        // Intercept stderr to also count as activity, then delegate common handling
        onStderr: (data) => {
          watchdog.reset();
          const common = createCommonHandlers(this.runtime, "Codex");
          common.onStderr?.(data);
        },
        onError: (error) => {
          const common = createCommonHandlers(this.runtime, "Codex");
          common.onError?.(error);
        },
        onClose: (code) => {
          this.runtime.logger.info("Codex command finished", {
            exitCode: code
          });
          watchdog.clear();
          if (this.activeProcessId === codexProcessId) {
            this.activeProcessId = null;
          }
          const duration_ms = Math.round(
            Date.now() - this.activeCommandStartTime
          );
          if (code !== 0 && !this.isStoppingActiveProcess && !watchdog.hasFired()) {
            this.addMessageToBuffer({
              agent: "codex",
              message: {
                type: "custom-error",
                session_id: null,
                duration_ms
              },
              threadId: input.threadId,
              token: input.token
            });
          }
          if (code === 0) {
            this.addMessageToBuffer({
              agent: "codex",
              message: {
                type: "result",
                subtype: "success",
                total_cost_usd: 0,
                duration_ms,
                duration_api_ms: duration_ms,
                is_error: false,
                num_turns: 1,
                result: "",
                session_id: ""
              },
              threadId: input.threadId,
              token: input.token
            });
          }
          this.flushMessageBuffer();
          resolve();
        }
      });
      this.runtime.logger.info("Spawned Codex process", {
        processId: codexProcessId
      });
      if (codexProcessId) {
        this.activeProcessId = codexProcessId;
        watchdog.reset();
      }
    });
  }
  /**
   * Run the Gemini command and process its output
   */
  async runGeminiCommand(input) {
    return new Promise((resolve) => {
      this.killActiveProcess();
      const command = geminiCommand({
        runtime: this.runtime,
        prompt: input.prompt
      });
      this.runtime.logger.info("Running Gemini command", { command });
      const sessionId = `gemini-${Date.now()}`;
      let fullContent = "";
      const geminiProcessId = this.runtime.spawnCommand(command, {
        env: {
          ...getCommonEnv(this.runtime),
          GEMINI_API_KEY: getGeminiApiKeyOrNull(this.runtime)
        },
        onStdout: (data) => {
          this.runtime.logger.debug("Gemini output", { data });
          if (data) {
            fullContent += data;
            this.addMessageToBuffer({
              agent: "gemini",
              message: {
                type: "assistant",
                message: {
                  role: "assistant",
                  content: data
                },
                parent_tool_use_id: null,
                session_id: sessionId
              },
              threadId: input.threadId,
              token: input.token
            });
          }
        },
        ...createCommonHandlers(this.runtime, "Gemini"),
        onClose: (code) => {
          this.runtime.logger.info("Gemini command finished", {
            exitCode: code
          });
          if (this.activeProcessId === geminiProcessId) {
            this.activeProcessId = null;
          }
          const duration_ms = Math.round(
            Date.now() - this.activeCommandStartTime
          );
          if (code !== 0 && !this.isStoppingActiveProcess) {
            this.addMessageToBuffer({
              agent: "gemini",
              message: {
                type: "custom-error",
                session_id: null,
                duration_ms
              },
              threadId: input.threadId,
              token: input.token
            });
          } else if (code === 0) {
            this.addMessageToBuffer({
              agent: "gemini",
              message: {
                type: "result",
                subtype: "success",
                total_cost_usd: 0,
                // Gemini cost tracking not implemented
                duration_ms,
                duration_api_ms: duration_ms,
                // Approximate
                is_error: false,
                num_turns: 1,
                result: fullContent.trim(),
                session_id: sessionId
              },
              threadId: input.threadId,
              token: input.token
            });
          }
          this.flushMessageBuffer();
          resolve();
        }
      });
      this.runtime.logger.info("Spawned Gemini process", {
        processId: geminiProcessId
      });
      if (geminiProcessId) {
        this.activeProcessId = geminiProcessId;
      }
    });
  }
  /**
   * Process messages to join adjacent string messages for Gemini and enrich with agent metadata
   */
  processMessagesForSending(entries) {
    if (entries.find((e) => e.agent === "gemini")) {
      const result = [];
      let currentStringContent = "";
      let currentSessionId = "gemini";
      let lastStringEntry = null;
      for (const entry of entries) {
        const message = entry.message;
        if (message.type === "assistant" && typeof message.message.content === "string") {
          currentStringContent += message.message.content;
          lastStringEntry = entry;
          continue;
        }
        if (message.type === "result" && message.session_id && message.session_id.startsWith("gemini-")) {
          currentSessionId = message.session_id;
        }
        if (currentStringContent && lastStringEntry) {
          result.push({
            agent: "gemini",
            message: {
              type: "assistant",
              message: {
                role: "assistant",
                content: currentStringContent
              },
              parent_tool_use_id: null,
              session_id: currentSessionId
            },
            threadId: lastStringEntry.threadId,
            token: lastStringEntry.token
          });
          currentStringContent = "";
          lastStringEntry = null;
        }
        result.push(entry);
      }
      if (currentStringContent && lastStringEntry) {
        result.push({
          agent: "gemini",
          message: {
            type: "assistant",
            message: {
              role: "assistant",
              content: currentStringContent
            },
            parent_tool_use_id: null,
            session_id: currentSessionId
          },
          threadId: lastStringEntry.threadId,
          token: lastStringEntry.token
        });
      }
      return result;
    }
    if (entries.find((e) => e.agent === "amp")) {
      const processed = processAmpMessagesForSending({
        entries,
        currentPrompt: this.ampCurrentPrompt,
        runtime: this.runtime
      });
      this.ampCurrentPrompt = null;
      return processed;
    }
    if (entries.find((e) => e.agent === "codex")) {
      const processed = processCodexMessagesForSending({
        entries,
        runtime: this.runtime
      });
      if (processed.find((e) => e.message.type === "result" && e.message.is_error)) {
        this.isStoppingActiveProcess = true;
        this.killActiveProcess();
      }
      return processed;
    }
    if (entries.find((e) => e.agent === "claudeCode")) {
      this.runtime.logger.info(
        "Processing Claude messages for agent metadata enrichment",
        {
          messageCount: entries.length,
          claudeMessageCount: entries.filter((e) => e.agent === "claudeCode").length
        }
      );
      return entries.map((entry) => {
        if (entry.agent === "claudeCode" && entry.message.type === "assistant") {
          const message = entry.message.message;
          if ("content" in message && Array.isArray(message.content)) {
            for (const content of message.content) {
              if (content.type === "tool_use" && content.name === "Task" && "input" in content) {
                const input = content.input;
                if (input.subagent_type) {
                  this.runtime.logger.info(
                    "Found Task tool with subagent_type",
                    {
                      subagent_type: input.subagent_type,
                      description: input.description?.substring(0, 50) + "..."
                    }
                  );
                  const agentProps = this.agentFrontmatterReader.getAgentProperties(
                    input.subagent_type
                  );
                  if (agentProps) {
                    this.runtime.logger.info(
                      "Found agent properties for subagent",
                      {
                        subagent_type: input.subagent_type,
                        hasColor: !!agentProps.color,
                        color: agentProps.color || "(no color)"
                      }
                    );
                    if (agentProps.color) {
                      input._agent_color = agentProps.color;
                      this.runtime.logger.info(
                        "Added agent color to Task tool input",
                        {
                          subagent_type: input.subagent_type,
                          color: agentProps.color
                        }
                      );
                    }
                  } else {
                    this.runtime.logger.info(
                      "No agent properties found for subagent",
                      {
                        subagent_type: input.subagent_type,
                        availableAgents: Array.from(
                          this.agentFrontmatterReader.getAllAgents().keys()
                        )
                      }
                    );
                  }
                }
              }
            }
          }
        }
        return entry;
      });
    }
    return entries;
  }
  /**
   * Add a message to the buffer and trigger debounced sending
   */
  addMessageToBuffer(entry) {
    this.messageBuffer.push(entry);
    this.runtime.logger.debug("Added message to buffer", {
      bufferSize: this.messageBuffer.length
    });
    if (this.isFlushInProgress) {
      this.pendingFlushRequired = true;
      return;
    }
    if (this.messageFlushTimer) {
      clearTimeout(this.messageFlushTimer);
    }
    this.messageFlushTimer = setTimeout(() => {
      this.flushMessageBuffer();
    }, this.messageFlushDelay);
  }
  /**
   * Send all buffered messages to the API and clear the buffer
   */
  async flushMessageBuffer() {
    if (this.isFlushInProgress) {
      this.pendingFlushRequired = true;
      return;
    }
    if (this.messageBuffer.length === 0) {
      return;
    }
    this.isFlushInProgress = true;
    this.pendingFlushRequired = false;
    if (this.messageFlushTimer) {
      clearTimeout(this.messageFlushTimer);
      this.messageFlushTimer = null;
    }
    const messageBufferCopy = [...this.messageBuffer];
    this.messageBuffer = [];
    const processedEntries = this.processMessagesForSending(messageBufferCopy);
    if (processedEntries.length === 0) {
      this.runtime.logger.info("All messages filtered out, nothing to send");
      this.isFlushInProgress = false;
      return;
    }
    const lastEntry = processedEntries[processedEntries.length - 1];
    const threadId = lastEntry.threadId;
    const token = lastEntry.token;
    try {
      await this.sendMessagesToAPI({
        messages: processedEntries.map((e) => e.message),
        timezone: this.getCurrentTimezone(),
        token,
        threadId
      });
      this.retryBackoff.reset();
    } catch (error) {
      this.retryBackoff.increment();
      this.messageBuffer = [...messageBufferCopy, ...this.messageBuffer];
      const retryInOrNull = this.retryBackoff.retryIn();
      if (retryInOrNull === null) {
        this.runtime.logger.error(
          "Max retries reached for this flush cycle, will wait for next trigger",
          {
            error,
            messageCount: messageBufferCopy.length,
            threadId,
            attempt: this.retryBackoff.retryAttempt
          }
        );
      } else {
        this.runtime.logger.error("API call failed, will retry messages", {
          error,
          messageCount: messageBufferCopy.length,
          retryingIn: retryInOrNull,
          attempt: this.retryBackoff.retryAttempt
        });
        this.pendingFlushRequired = true;
      }
    } finally {
      this.isFlushInProgress = false;
      if (this.pendingFlushRequired && this.messageBuffer.length > 0) {
        const retryInOrNull = this.retryBackoff.retryIn();
        const delay = retryInOrNull ?? this.messageFlushDelay;
        this.messageFlushTimer = setTimeout(() => {
          this.flushMessageBuffer();
        }, delay);
      }
    }
  }
  /**
   * Send an array of messages to the API endpoint
   */
  async sendMessagesToAPI({
    messages,
    timezone,
    token,
    threadId
  }) {
    try {
      this.runtime.logger.info("Sending messages to API", {
        messageCount: messages.length,
        threadId
      });
      const payload = {
        messages,
        threadId,
        timezone
      };
      await this.runtime.serverPost(payload, token);
      this.runtime.logger.info("Messages sent successfully", {
        messageCount: messages.length
      });
    } catch (error) {
      this.runtime.logger.error("Failed to send messages to API", {
        error,
        messageCount: messages.length
      });
      throw error;
    }
  }
  /**
   * Get a specific feature flag value
   */
  getFeatureFlag(name) {
    return this.featureFlags[name] ?? false;
  }
  async teardown() {
    this.killActiveProcess();
    await this.flushMessageBuffer();
    await this.runtime.writeToNamedPipe({ type: "kill" });
    if (this.uptimeReportingTimer) {
      clearInterval(this.uptimeReportingTimer);
    }
    if (this.messageFlushTimer) {
      clearTimeout(this.messageFlushTimer);
    }
  }
};

// src/runtime.ts
import { exec, execSync, spawn } from "node:child_process";
import EventEmitter from "node:events";
import fs2 from "node:fs";
import readline from "node:readline";

// ../../node_modules/.pnpm/ansi-regex@6.1.0/node_modules/ansi-regex/index.js
function ansiRegex({ onlyFirst = false } = {}) {
  const ST = "(?:\\u0007|\\u001B\\u005C|\\u009C)";
  const pattern = [
    `[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?${ST})`,
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"
  ].join("|");
  return new RegExp(pattern, onlyFirst ? void 0 : "g");
}

// ../../node_modules/.pnpm/strip-ansi@7.1.0/node_modules/strip-ansi/index.js
var regex = ansiRegex();
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }
  return string.replace(regex, "");
}

// src/logger.ts
var Logger = class {
  outputFormat;
  constructor(outputFormat = "text") {
    this.outputFormat = outputFormat;
  }
  formatMessage(level, message, data) {
    if (this.outputFormat === "text") {
      const parts = [message];
      for (const [k, v] of Object.entries(data || {})) {
        parts.push(`${k}: ${v}`);
      }
      return parts.join(" ");
    }
    const logEntry = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      level,
      message,
      ...data && { data }
    };
    return JSON.stringify(logEntry);
  }
  info(message, data) {
    console.log(this.formatMessage("info", message, data));
  }
  error(message, data) {
    console.error(this.formatMessage("error", message, data));
  }
  warn(message, data) {
    console.warn(this.formatMessage("warn", message, data));
  }
  debug(message, data) {
    console.log(this.formatMessage("debug", message, data));
  }
  log(level, message, data) {
    switch (level) {
      case "info":
        this.info(message, data);
        break;
      case "error":
        this.error(message, data);
        break;
      case "warn":
        this.warn(message, data);
        break;
      case "debug":
        this.debug(message, data);
        break;
    }
  }
};

// src/runtime.ts
var DaemonRuntime = class {
  url;
  pipePath;
  logger;
  skipReportingDaemonEvents = false;
  isTerminated = false;
  eventEmitter = new EventEmitter();
  processTimeouts = /* @__PURE__ */ new Map();
  constructor({
    url,
    pipePath,
    outputFormat,
    skipReportingDaemonEvents
  }) {
    this.url = url;
    this.pipePath = pipePath;
    this.logger = new Logger(outputFormat);
    this.skipReportingDaemonEvents = !!skipReportingDaemonEvents;
    try {
      if (fs2.existsSync(this.pipePath)) {
        fs2.unlinkSync(this.pipePath);
      }
      execSync(`mkfifo "${this.pipePath}"`);
      execSync(`chmod 666 "${this.pipePath}"`);
    } catch (error) {
      this.logger.error("Failed to create named pipe", { error });
      throw error;
    }
    process.on("SIGTERM", (signal) => {
      this.logger.info("SIGTERM received", { signal });
      this.teardown();
    });
    process.on("SIGINT", (signal) => {
      this.logger.info("SIGINT received", { signal });
      this.teardown();
    });
  }
  async teardown() {
    if (this.isTerminated) {
      return;
    }
    this.isTerminated = true;
    await Promise.allSettled(
      this.eventEmitter.listeners("teardown").map((fn) => fn())
    );
    if (fs2.existsSync(this.pipePath)) {
      fs2.unlinkSync(this.pipePath);
    }
    this.exitProcess();
  }
  execSync(command) {
    return execSync(command, {
      encoding: "utf-8"
    });
  }
  exitProcess() {
    process.kill(-process.pid, "SIGKILL");
  }
  onTeardown(callback) {
    this.eventEmitter.on("teardown", callback);
  }
  async serverPost(body, token) {
    const url = `${this.url}/api/daemon-event`;
    const logArgs = { url, body: JSON.stringify(body) };
    if (this.skipReportingDaemonEvents) {
      this.logger.info(`[SKIPPED] POST to ${url}`, logArgs);
      return;
    }
    this.logger.info(`POST to ${url}`, logArgs);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Daemon-Token": token
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  async listenToNamedPipe(callback) {
    if (this.isTerminated) {
      return;
    }
    if (!fs2.existsSync(this.pipePath)) {
      this.logger.error("Pipe does not exist", {
        pipePath: this.pipePath
      });
      return;
    }
    const stream = fs2.createReadStream(this.pipePath, {
      encoding: "utf8"
    });
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
      // Handle Windows line endings properly
    });
    rl.on("line", (line) => {
      if (line.trim()) {
        callback(line.trim());
      }
    });
    rl.on("close", () => {
      if (!this.isTerminated) {
        this.listenToNamedPipe(callback);
      }
    });
    stream.on("end", () => {
      rl.close();
    });
    stream.on("error", (error) => {
      this.logger.error("Pipe stream error", { error });
    });
    stream.on("close", () => {
      this.logger.info("Pipe stream closed");
    });
    stream.on("open", () => {
      this.logger.info("Pipe stream open");
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  async writeToNamedPipe(data, timeout = 100) {
    await Promise.race([
      new Promise(
        (_, reject) => setTimeout(() => {
          reject(
            new Error(
              `Timeout after ${timeout}ms. It is likely that the pipe is not ready to be written to. This is probably because the reader is not running.`
            )
          );
        }, timeout)
      ),
      new Promise((resolve, reject) => {
        exec(`echo '${JSON.stringify(data)}' >> "${this.pipePath}"`, (err) => {
          if (err) {
            this.logger.error("Error writing to pipe", { error: err });
            reject(err);
            return;
          }
          resolve();
        });
      })
    ]);
  }
  killChildProcessGroup(pid) {
    try {
      process.kill(-pid, "SIGKILL");
    } catch (error) {
      this.logger.error("Error killing child process group", { error });
    }
  }
  spawnCommandLine(command, {
    env,
    onStdoutLine,
    onStderr,
    onError,
    onClose
  }) {
    const child = spawn("bash", ["-lc", command], {
      env,
      detached: true,
      stdio: ["inherit", "pipe", "pipe"]
    });
    if (child.stdout) {
      const rl = readline.createInterface({
        input: child.stdout,
        crlfDelay: Infinity
        // Handle Windows line endings properly
      });
      rl.on("line", (line) => {
        if (line.trim()) {
          onStdoutLine(stripAnsi(line));
        }
      });
    } else {
      this.logger.warn("No stdout available");
    }
    if (child.stderr) {
      child.stderr.on("data", (data) => {
        const output = data.toString();
        onStderr(output);
      });
    } else {
      this.logger.warn("No stderr available");
    }
    child.on("close", (code) => {
      onClose(code);
    });
    child.on("error", (error) => {
      onError(error);
    });
    return child.pid;
  }
  spawnCommand(command, {
    env,
    onStdout,
    onStderr,
    onError,
    onClose
  }) {
    const child = spawn("bash", ["-lc", command], {
      env,
      detached: true,
      stdio: ["inherit", "pipe", "pipe"]
    });
    if (child.stdout) {
      child.stdout.on("data", (data) => {
        const output = stripAnsi(data.toString());
        onStdout(output);
      });
    } else {
      this.logger.warn("No stdout available");
    }
    if (child.stderr) {
      child.stderr.on("data", (data) => {
        const output = data.toString();
        onStderr(output);
      });
    } else {
      this.logger.warn("No stderr available");
    }
    child.on("close", (code) => {
      onClose(code);
    });
    child.on("error", (error) => {
      onError(error);
    });
    return child.pid;
  }
  readFileSync(path2) {
    return fs2.readFileSync(path2, "utf8");
  }
  writeFileSync(path2, data) {
    return fs2.writeFileSync(path2, data, "utf8");
  }
  appendFileSync(path2, data) {
    return fs2.appendFileSync(path2, data);
  }
};

// src/index.ts
function parseCliArgs() {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      url: {
        type: "string",
        short: "u",
        default: "http://localhost:3000"
      },
      "output-format": {
        type: "string",
        default: "text"
      },
      "skip-reporting-daemon-events": {
        type: "boolean",
        default: false
      },
      "mcp-config-path": {
        type: "string"
      },
      help: {
        type: "boolean",
        short: "h"
      }
    },
    allowPositionals: false
  });
  if (values.help) {
    console.log(`
Usage: terragon-daemon [options]

Options:
  -u, --url <url>                  Server URL (default: http://localhost:3000)
  --skip-reporting-daemon-events   Skip reporting daemon events (default: false)
  --output-format <format>         Output format: text or json (default: text)
  --mcp-config-path <path>         MCP config path
  -h, --help                       Show this help message

The daemon will create a named pipe at /tmp/terragon-daemon.pipe and listen for JSON messages with:
{
  "token": "string",
  "prompt": "string", 
  "sessionId": "string|null",
  "model": "opus|sonnet"
}

Examples:
  terragon-daemon
  terragon-daemon -u https://api.example.com
  terragon-daemon --output-format json
  terragon-daemon --skip-reporting-daemon-events
  terragon-daemon --output-format json --mcp-config-path /tmp/mcp-server.json
  
  # Send a message to the pipe:
  echo '{"token":"abc123","prompt":"Hello","sessionId":null,"model":"sonnet"}' > /tmp/terragon-daemon.pipe
    `);
    process.exit(0);
  }
  const outputFormat = values["output-format"];
  if (outputFormat !== "text" && outputFormat !== "json") {
    console.error("\u274C Invalid output format. Must be 'text' or 'json'");
    process.exit(1);
  }
  return {
    url: values["url"],
    outputFormat,
    mcpConfigPath: values["mcp-config-path"],
    skipReportingDaemonEvents: values["skip-reporting-daemon-events"]
  };
}
try {
  const cliArgs = parseCliArgs();
  const runtime = new DaemonRuntime({
    url: cliArgs.url,
    pipePath: defaultPipePath,
    outputFormat: cliArgs.outputFormat,
    skipReportingDaemonEvents: cliArgs.skipReportingDaemonEvents
  });
  const daemon = new TerragonDaemon({
    runtime,
    mcpConfigPath: cliArgs.mcpConfigPath
  });
  daemon.start().catch((error) => {
    console.error("\u274C Failed to start daemon:", error);
    process.exit(1);
  });
} catch (error) {
  console.error("\u274C Failed to parse arguments:", error);
  process.exit(1);
}
//# sourceMappingURL=index.js.map
