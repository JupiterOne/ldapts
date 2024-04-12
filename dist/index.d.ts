import { BerWriter, BerReader } from 'asn1';
import * as tls from 'tls';
import { EventEmitter } from 'events';
import { StrictEventEmitter } from 'strict-event-emitter-types';

interface ControlOptions {
    critical?: boolean;
}
declare class Control {
    type: string;
    critical: boolean;
    constructor(type: string, options?: ControlOptions);
    write(writer: BerWriter): void;
    parse(reader: BerReader): void;
    protected writeControl(_: BerWriter): void;
    protected parseControl(_: BerReader): void;
}

interface EntryChangeNotificationControlValue {
    changeType: number;
    previousDN?: string | null;
    changeNumber: number;
}
interface EntryChangeNotificationControlOptions extends ControlOptions {
    value?: EntryChangeNotificationControlValue;
}
declare class EntryChangeNotificationControl extends Control {
    static type: string;
    value?: EntryChangeNotificationControlValue;
    constructor(options?: EntryChangeNotificationControlOptions);
    parseControl(reader: BerReader): void;
    writeControl(writer: BerWriter): void;
}

interface PagedResultsValue {
    size: number;
    cookie?: Buffer;
}
interface PagedResultsControlOptions extends ControlOptions {
    value?: PagedResultsValue;
}
declare class PagedResultsControl extends Control {
    static type: string;
    value?: PagedResultsValue;
    constructor(options?: PagedResultsControlOptions);
    parseControl(reader: BerReader): void;
    writeControl(writer: BerWriter): void;
}

interface PersistentSearchValue {
    changeTypes: number;
    changesOnly: boolean;
    returnECs: boolean;
}
interface PersistentSearchControlOptions extends ControlOptions {
    value?: PersistentSearchValue;
}
declare class PersistentSearchControl extends Control {
    static type: string;
    value?: PersistentSearchValue;
    constructor(options?: PersistentSearchControlOptions);
    parseControl(reader: BerReader): void;
    writeControl(writer: BerWriter): void;
}

interface ServerSideSortingRequestValue {
    attributeType: string;
    orderingRule?: string;
    reverseOrder?: boolean;
}
interface ServerSideSortingRequestControlOptions extends ControlOptions {
    value?: ServerSideSortingRequestValue | ServerSideSortingRequestValue[];
}
declare class ServerSideSortingRequestControl extends Control {
    static type: string;
    values: ServerSideSortingRequestValue[];
    constructor(options?: ServerSideSortingRequestControlOptions);
    parseControl(reader: BerReader): void;
    writeControl(writer: BerWriter): void;
}

type RDNAttributes = Record<string, string>;
/**
 * RDN is a part of DN, and it consists of key & value pair. This class also supports
 * compound RDNs, meaning that one RDN can hold multiple key & value pairs.
 */
declare class RDN {
    private attrs;
    constructor(attrs?: RDNAttributes);
    /**
     * Set an RDN pair.
     * @param {string} name
     * @param {string} value
     * @returns {object} RDN class
     */
    set(name: string, value: string): this;
    /**
     * Get an RDN value at the specified name.
     * @param {string} name
     * @returns {string | undefined} value
     */
    get(name: string): string | undefined;
    /**
     * Checks, if this instance of RDN is equal to the other RDN.
     * @param {object} other
     */
    equals(other: RDN): boolean;
    /**
     * Parse the RDN, escape values & return a string representation.
     * @returns {string} Escaped string representation of RDN.
     */
    toString(): string;
    /**
     * Escape values & return a string representation.
     *
     * RFC defines, that these characters should be escaped:
     *
     * Comma                          ,
     * Backslash character            \
     * Pound sign (hash sign)         #
     * Plus sign                      +
     * Less than symbol               <
     * Greater than symbol            >
     * Semicolon                      ;
     * Double quote (quotation mark)  "
     * Equal sign                     =
     * Leading or trailing spaces
     *
     * @param {string} value - RDN value to be escaped
     * @returns {string} Escaped string representation of RDN
     */
    private _escape;
}

/**
 * RDNMap is an interface, that maps every key & value to a specified RDN.
 *
 * Value can be either a string or a list of strings, where every value in the list will
 * get applied to the same key of an RDN.
 */
type RDNMap = Record<string, string[] | string>;
/**
 * DN class provides chain building of multiple RDNs, which can be later build into
 * escaped string representation.
 */
declare class DN {
    private rdns;
    constructor(rdns?: RDN[] | RDNMap);
    /**
     * Add an RDN component to the DN, consisting of key & value pair.
     * @param {string} key
     * @param {string} value
     * @returns {object} DN
     */
    addPairRDN(key: string, value: string): this;
    /**
     * Add a single RDN component to the DN.
     *
     * Note, that this RDN can be compound (single RDN can have multiple key & value pairs).
     * @param {object} rdn
     * @returns {object} DN
     */
    addRDN(rdn: RDN | RDNAttributes): this;
    /**
     * Add multiple RDN components to the DN.
     *
     * This method allows different interfaces to add RDNs into the DN.
     * It can:
     * - join other DN into this DN
     * - join list of RDNs or RDNAttributes into this DN
     * - create RDNs from object map, where every key & value will create a new RDN
     * @param {object|object[]} rdns
     * @returns {object} DN
     */
    addRDNs(rdns: DN | RDN[] | RDNAttributes[] | RDNMap): this;
    getRDNs(): RDN[];
    get(index: number): RDN | undefined;
    set(rdn: RDN | RDNAttributes, index: number): this;
    isEmpty(): boolean;
    /**
     * Checks, if this instance of DN is equal to the other DN.
     * @param {object} other
     */
    equals(other: DN): boolean;
    clone(): DN;
    reverse(): this;
    pop(): RDN | undefined;
    shift(): RDN | undefined;
    /**
     * Parse the DN, escape values & return a string representation.
     */
    toString(): string;
}

interface MessageParserErrorDetails {
    messageId: number;
    protocolOperation?: number;
}
declare class MessageParserError extends Error {
    messageDetails?: MessageParserErrorDetails;
}

declare abstract class ResultCodeError extends Error {
    code: number;
    constructor(code: number, message: string);
}

declare class AdminLimitExceededError extends ResultCodeError {
    constructor(message?: string);
}

declare class AffectsMultipleDSAsError extends ResultCodeError {
    constructor(message?: string);
}

declare class AliasDerefProblemError extends ResultCodeError {
    constructor(message?: string);
}

declare class AliasProblemError extends ResultCodeError {
    constructor(message?: string);
}

declare class AlreadyExistsError extends ResultCodeError {
    constructor(message?: string);
}

declare class AuthMethodNotSupportedError extends ResultCodeError {
    constructor(message?: string);
}

declare class BusyError extends ResultCodeError {
    constructor(message?: string);
}

declare class ConfidentialityRequiredError extends ResultCodeError {
    constructor(message?: string);
}

declare class ConstraintViolationError extends ResultCodeError {
    constructor(message?: string);
}

declare class InappropriateAuthError extends ResultCodeError {
    constructor(message?: string);
}

declare class InappropriateMatchingError extends ResultCodeError {
    constructor(message?: string);
}

declare class InsufficientAccessError extends ResultCodeError {
    constructor(message?: string);
}

declare class InvalidCredentialsError extends ResultCodeError {
    constructor(message?: string);
}

declare class InvalidDNSyntaxError extends ResultCodeError {
    constructor(message?: string);
}

declare class InvalidSyntaxError extends ResultCodeError {
    constructor(message?: string);
}

declare class IsLeafError extends ResultCodeError {
    constructor(message?: string);
}

declare class LoopDetectError extends ResultCodeError {
    constructor(message?: string);
}

declare class NamingViolationError extends ResultCodeError {
    constructor(message?: string);
}

declare class NoObjectClassModsError extends ResultCodeError {
    constructor(message?: string);
}

declare class NoSuchAttributeError extends ResultCodeError {
    constructor(message?: string);
}

declare class NoSuchObjectError extends ResultCodeError {
    constructor(message?: string);
}

declare class NotAllowedOnNonLeafError extends ResultCodeError {
    constructor(message?: string);
}

declare class NotAllowedOnRDNError extends ResultCodeError {
    constructor(message?: string);
}

declare class NoResultError extends ResultCodeError {
    constructor(message?: string);
}

declare class ObjectClassViolationError extends ResultCodeError {
    constructor(message?: string);
}

declare class OperationsError extends ResultCodeError {
    constructor(message?: string);
}

declare class ProtocolError extends ResultCodeError {
    constructor(message?: string);
}

declare class ResultsTooLargeError extends ResultCodeError {
    constructor(message?: string);
}

declare const ProtocolOperation: {
    LDAP_VERSION_3: 3;
    LBER_SET: 49;
    LDAP_CONTROLS: 160;
    LDAP_REQ_BIND: 96;
    LDAP_REQ_BIND_SASL: 163;
    LDAP_REQ_UNBIND: 66;
    LDAP_REQ_SEARCH: 99;
    LDAP_REQ_MODIFY: 102;
    LDAP_REQ_ADD: 104;
    LDAP_REQ_DELETE: 74;
    LDAP_REQ_MODRDN: 108;
    LDAP_REQ_COMPARE: 110;
    LDAP_REQ_ABANDON: 80;
    LDAP_REQ_EXTENSION: 119;
    LDAP_RES_BIND: 97;
    LDAP_RES_SEARCH_ENTRY: 100;
    LDAP_RES_SEARCH_REF: 115;
    LDAP_RES_SEARCH: 101;
    LDAP_RES_MODIFY: 103;
    LDAP_RES_ADD: 105;
    LDAP_RES_DELETE: 107;
    LDAP_RES_MODRDN: 109;
    LDAP_RES_COMPARE: 111;
    LDAP_RES_EXTENSION: 120;
};
type ProtocolOperationValues = (typeof ProtocolOperation)[keyof typeof ProtocolOperation];

interface MessageOptions {
    messageId: number;
    controls?: Control[];
}
declare abstract class Message {
    version: number;
    messageId: number;
    abstract protocolOperation: ProtocolOperationValues;
    controls?: Control[];
    protected constructor(options: MessageOptions);
    write(): Buffer;
    parse(reader: BerReader, requestControls: Control[]): void;
    toString(): string;
    protected parseMessage(_: BerReader): void;
    protected writeMessage(_: BerWriter): void;
}

interface MessageResponseOptions extends MessageOptions {
    status?: number;
    matchedDN?: string;
    errorMessage?: string;
}
declare abstract class MessageResponse extends Message {
    status: number;
    matchedDN: string;
    errorMessage: string;
    protected constructor(options: MessageResponseOptions);
    parseMessage(reader: BerReader): void;
}

declare class BindResponse extends MessageResponse {
    protocolOperation: ProtocolOperationValues;
    data: string[];
    constructor(options: MessageResponseOptions);
    parseMessage(reader: BerReader): void;
}

declare class SaslBindInProgressError extends ResultCodeError {
    response: BindResponse;
    constructor(response: BindResponse);
}

declare class SizeLimitExceededError extends ResultCodeError {
    constructor(message?: string);
}

declare class StrongAuthRequiredError extends ResultCodeError {
    constructor(message?: string);
}

declare class TimeLimitExceededError extends ResultCodeError {
    constructor(message?: string);
}

declare class TLSNotSupportedError extends ResultCodeError {
    constructor(message?: string);
}

declare class TypeOrValueExistsError extends ResultCodeError {
    constructor(message?: string);
}

declare class UnavailableCriticalExtensionError extends ResultCodeError {
    constructor(message?: string);
}

declare class UnavailableError extends ResultCodeError {
    constructor(message?: string);
}

declare class UndefinedTypeError extends ResultCodeError {
    constructor(message?: string);
}

declare class UnknownStatusCodeError extends ResultCodeError {
    constructor(code: number, message?: string);
}

declare class UnwillingToPerformError extends ResultCodeError {
    constructor(message?: string);
}

declare const SearchFilter: {
    and: 160;
    or: 161;
    not: 162;
    equalityMatch: 163;
    substrings: 164;
    greaterOrEqual: 165;
    lessOrEqual: 166;
    present: 135;
    approxMatch: 168;
    extensibleMatch: 169;
};
type SearchFilterValues = (typeof SearchFilter)[keyof typeof SearchFilter];

declare abstract class Filter {
    abstract type: SearchFilterValues;
    write(writer: BerWriter): void;
    parse(reader: BerReader): void;
    matches(_?: Record<string, string>, __?: boolean): boolean;
    /**
     * RFC 2254 Escaping of filter strings
     * Raw                     Escaped
     * (o=Parens (R Us))       (o=Parens \28R Us\29)
     * (cn=star*)              (cn=star\2A)
     * (filename=C:\MyFile)    (filename=C:\5cMyFile)
     *
     * @param {string|Buffer} input
     */
    escape(input: Buffer | string): string;
    abstract toString(): string;
    protected parseFilter(_: BerReader): void;
    protected writeFilter(_: BerWriter): void;
    protected getObjectValue(objectToCheck: Record<string, string>, key: string, strictAttributeCase?: boolean): string | undefined;
}

interface AndFilterOptions {
    filters: Filter[];
}
declare class AndFilter extends Filter {
    type: SearchFilterValues;
    filters: Filter[];
    constructor(options: AndFilterOptions);
    writeFilter(writer: BerWriter): void;
    matches(objectToCheck?: Record<string, string>, strictAttributeCase?: boolean): boolean;
    toString(): string;
}

interface ApproximateFilterOptions {
    attribute?: string;
    value?: string;
}
declare class ApproximateFilter extends Filter {
    type: SearchFilterValues;
    attribute: string;
    value: string;
    constructor(options?: ApproximateFilterOptions);
    parseFilter(reader: BerReader): void;
    writeFilter(writer: BerWriter): void;
    matches(_?: Record<string, string>, __?: boolean): boolean;
    toString(): string;
}

interface EqualityFilterOptions {
    attribute?: string;
    value?: Buffer | string;
}
declare class EqualityFilter extends Filter {
    type: SearchFilterValues;
    attribute: string;
    value: Buffer | string;
    constructor(options?: EqualityFilterOptions);
    parseFilter(reader: BerReader): void;
    writeFilter(writer: BerWriter): void;
    matches(objectToCheck?: Record<string, string>, strictAttributeCase?: boolean): boolean;
    toString(): string;
}

interface ExtensibleFilterOptions {
    rule?: string;
    matchType?: string;
    value?: string;
    dnAttributes?: boolean;
    initial?: string;
    any?: string[];
    final?: string;
}
declare class ExtensibleFilter extends Filter {
    type: SearchFilterValues;
    value: string;
    rule: string;
    matchType: string;
    dnAttributes: boolean;
    constructor(options?: ExtensibleFilterOptions);
    parseFilter(reader: BerReader): void;
    writeFilter(writer: BerWriter): void;
    matches(_?: Record<string, string>, __?: boolean): boolean;
    toString(): string;
}

interface GreaterThanEqualsFilterOptions {
    attribute?: string;
    value?: string;
}
declare class GreaterThanEqualsFilter extends Filter {
    type: SearchFilterValues;
    attribute: string;
    value: string;
    constructor(options?: GreaterThanEqualsFilterOptions);
    parseFilter(reader: BerReader): void;
    writeFilter(writer: BerWriter): void;
    matches(objectToCheck?: Record<string, string>, strictAttributeCase?: boolean): boolean;
    toString(): string;
}

interface LessThanEqualsFilterOptions {
    attribute?: string;
    value?: string;
}
declare class LessThanEqualsFilter extends Filter {
    type: SearchFilterValues;
    attribute: string;
    value: string;
    constructor(options?: LessThanEqualsFilterOptions);
    parseFilter(reader: BerReader): void;
    writeFilter(writer: BerWriter): void;
    matches(objectToCheck?: Record<string, string>, strictAttributeCase?: boolean): boolean;
    toString(): string;
}

interface NotFilterOptions {
    filter: Filter;
}
declare class NotFilter extends Filter {
    type: SearchFilterValues;
    filter: Filter;
    constructor(options: NotFilterOptions);
    writeFilter(writer: BerWriter): void;
    matches(objectToCheck?: Record<string, string>, strictAttributeCase?: boolean): boolean;
    toString(): string;
}

interface OrFilterOptions {
    filters: Filter[];
}
declare class OrFilter extends Filter {
    type: SearchFilterValues;
    filters: Filter[];
    constructor(options: OrFilterOptions);
    writeFilter(writer: BerWriter): void;
    matches(objectToCheck?: Record<string, string>, strictAttributeCase?: boolean): boolean;
    toString(): string;
}

interface PresenceFilterOptions {
    attribute?: string;
}
declare class PresenceFilter extends Filter {
    type: SearchFilterValues;
    attribute: string;
    constructor(options?: PresenceFilterOptions);
    parseFilter(reader: BerReader): void;
    writeFilter(writer: BerWriter): void;
    matches(objectToCheck?: Record<string, string>, strictAttributeCase?: boolean): boolean;
    toString(): string;
}

interface SubstringFilterOptions {
    attribute?: string;
    initial?: string;
    any?: string[];
    final?: string;
}
declare class SubstringFilter extends Filter {
    type: SearchFilterValues;
    attribute: string;
    initial: string;
    any: string[];
    final: string;
    constructor(options?: SubstringFilterOptions);
    parseFilter(reader: BerReader): void;
    writeFilter(writer: BerWriter): void;
    matches(objectToCheck?: Record<string, string>, strictAttributeCase?: boolean): boolean;
    toString(): string;
    private static _escapeRegExp;
}

interface AbandonRequestMessageOptions extends MessageOptions {
    abandonId?: number;
}
declare class AbandonRequest extends Message {
    protocolOperation: ProtocolOperationValues;
    abandonId: number;
    constructor(options: AbandonRequestMessageOptions);
    writeMessage(writer: BerWriter): void;
    parseMessage(reader: BerReader): void;
}

interface AttributeOptions {
    type?: string;
    values?: Buffer[] | string[];
}
declare class Attribute {
    private buffers;
    type: string;
    values: Buffer[] | string[];
    constructor(options?: AttributeOptions);
    get parsedBuffers(): Buffer[];
    write(writer: BerWriter): void;
    parse(reader: BerReader): void;
    private _isBinaryType;
}

interface AddMessageOptions extends MessageOptions {
    dn: string;
    attributes?: Attribute[];
}
declare class AddRequest extends Message {
    protocolOperation: ProtocolOperationValues;
    dn: string;
    attributes: Attribute[];
    constructor(options: AddMessageOptions);
    writeMessage(writer: BerWriter): void;
    parseMessage(reader: BerReader): void;
}

declare class AddResponse extends MessageResponse {
    protocolOperation: ProtocolOperationValues;
    constructor(options: MessageResponseOptions);
}

declare const SASL_MECHANISMS: readonly ["EXTERNAL", "PLAIN", "DIGEST-MD5", "SCRAM-SHA-1"];
type SaslMechanism = (typeof SASL_MECHANISMS)[number];
interface BindRequestMessageOptions extends MessageOptions {
    dn?: string;
    password?: string;
    mechanism?: string;
}
declare class BindRequest extends Message {
    protocolOperation: ProtocolOperationValues;
    dn: string;
    password: string;
    mechanism: string | undefined;
    constructor(options: BindRequestMessageOptions);
    writeMessage(writer: BerWriter): void;
    parseMessage(reader: BerReader): void;
}

interface CompareRequestMessageOptions extends MessageOptions {
    dn?: string;
    attribute?: string;
    value?: string;
}
declare class CompareRequest extends Message {
    protocolOperation: ProtocolOperationValues;
    dn: string;
    attribute: string;
    value: string;
    constructor(options: CompareRequestMessageOptions);
    writeMessage(writer: BerWriter): void;
    parseMessage(reader: BerReader): void;
}

declare enum CompareResult {
    /**
     * Indicates that the target entry exists and contains the specified attribute with the indicated value
     */
    compareTrue = 6,
    /**
     * Indicates that the target entry exists and contains the specified attribute, but that the attribute does not have the indicated value
     */
    compareFalse = 5,
    /**
     * Indicates that the target entry exists but does not contain the specified attribute
     */
    noSuchAttribute = 22,
    /**
     * Indicates that the target entry does not exist
     */
    noSuchObject = 50
}
declare class CompareResponse extends MessageResponse {
    protocolOperation: ProtocolOperationValues;
    constructor(options: MessageResponseOptions);
}

interface DeleteRequestMessageOptions extends MessageOptions {
    dn?: string;
}
declare class DeleteRequest extends Message {
    protocolOperation: ProtocolOperationValues;
    dn: string;
    constructor(options: DeleteRequestMessageOptions);
    writeMessage(writer: BerWriter): void;
    parseMessage(reader: BerReader): void;
}

declare class DeleteResponse extends MessageResponse {
    protocolOperation: ProtocolOperationValues;
    constructor(options: MessageResponseOptions);
}

interface ExtendedRequestMessageOptions extends MessageOptions {
    oid?: string;
    value?: Buffer | string;
}
declare class ExtendedRequest extends Message {
    protocolOperation: ProtocolOperationValues;
    oid: string;
    value: Buffer | string;
    constructor(options: ExtendedRequestMessageOptions);
    writeMessage(writer: BerWriter): void;
    parseMessage(reader: BerReader): void;
}

interface ExtendedResponseOptions extends MessageResponseOptions {
    oid?: string;
    value?: string;
}
declare const ExtendedResponseProtocolOperations: {
    oid: number;
    value: number;
};
declare class ExtendedResponse extends MessageResponse {
    protocolOperation: ProtocolOperationValues;
    oid?: string;
    value?: string;
    constructor(options: ExtendedResponseOptions);
    parseMessage(reader: BerReader): void;
}

interface ModifyDNRequestMessageOptions extends MessageOptions {
    deleteOldRdn?: boolean;
    dn?: string;
    newRdn?: string;
    newSuperior?: string;
}
declare class ModifyDNRequest extends Message {
    protocolOperation: ProtocolOperationValues;
    deleteOldRdn: boolean;
    dn: string;
    newRdn: string;
    newSuperior: string;
    constructor(options: ModifyDNRequestMessageOptions);
    writeMessage(writer: BerWriter): void;
    parseMessage(reader: BerReader): void;
}

declare class ModifyDNResponse extends MessageResponse {
    protocolOperation: ProtocolOperationValues;
    constructor(options: MessageResponseOptions);
}

interface ChangeOptions {
    operation?: 'add' | 'delete' | 'replace';
    modification: Attribute;
}
declare class Change {
    operation: 'add' | 'delete' | 'replace';
    modification: Attribute;
    constructor(options?: ChangeOptions);
    write(writer: BerWriter): void;
    parse(reader: BerReader): void;
}

interface ModifyRequestMessageOptions extends MessageOptions {
    dn?: string;
    changes?: Change[];
}
declare class ModifyRequest extends Message {
    protocolOperation: ProtocolOperationValues;
    dn: string;
    changes: Change[];
    constructor(options: ModifyRequestMessageOptions);
    writeMessage(writer: BerWriter): void;
    parseMessage(reader: BerReader): void;
}

declare class ModifyResponse extends MessageResponse {
    protocolOperation: ProtocolOperationValues;
    constructor(options: MessageResponseOptions);
}

interface SearchEntryOptions extends MessageResponseOptions {
    name?: string;
    attributes?: Attribute[];
}
interface Entry {
    dn: string;
    [index: string]: Buffer | Buffer[] | string[] | string;
}
declare class SearchEntry extends MessageResponse {
    protocolOperation: ProtocolOperationValues;
    name: string;
    attributes: Attribute[];
    constructor(options: SearchEntryOptions);
    parseMessage(reader: BerReader): void;
    toObject(requestAttributes: string[], explicitBufferAttributes: string[]): Entry;
}

interface SearchReferenceOptions extends MessageResponseOptions {
    uris?: string[];
}
declare class SearchReference extends MessageResponse {
    protocolOperation: ProtocolOperationValues;
    uris: string[];
    constructor(options: SearchReferenceOptions);
    parseMessage(reader: BerReader): void;
}

interface ClientOptions {
    /**
     * A valid LDAP URL (proto/host/port only)
     */
    url: string;
    /**
     * Milliseconds client should let operations live for before timing out (Default: no timeout)
     */
    timeout?: number;
    /**
     * Milliseconds client should wait before timing out on TCP connections
     */
    connectTimeout?: number;
    /**
     * Additional options passed to TLS connection layer when connecting via ldaps://
     */
    tlsOptions?: tls.ConnectionOptions;
    /**
     * Force strict DN parsing for client methods (Default: true)
     */
    strictDN?: boolean;
}
interface SearchPageOptions {
    /**
     * Number of SearchEntries to return per page for a search request. If the page size is greater than or equal to the
     * sizeLimit value, the server should ignore the control as the request can be satisfied in a single page.
     */
    pageSize?: number;
}
interface SearchOptions {
    /**
     * Specifies how broad the search context is:
     * - base - Indicates that only the entry specified as the search base should be considered. None of its subordinates will be considered.
     * - one - Indicates that only the immediate children of the entry specified as the search base should be considered. The base entry itself should not be considered, nor any descendants of the immediate children of the base entry.
     * - sub - Indicates that the entry specified as the search base, and all of its subordinates to any depth, should be considered.
     * - children - Indicates that the entry specified by the search base should not be considered, but all of its subordinates to any depth should be considered.
     */
    scope?: 'base' | 'children' | 'one' | 'sub';
    /**
     * Specifies how the server must treat references to other entries:
     * - never - Never dereferences entries, returns alias objects instead. The alias contains the reference to the real entry.
     * - always - Always returns the referenced entries, not the alias object.
     * - search - While searching subordinates of the base object, dereferences any alias within the search scope. Dereferenced objects become the bases of further search scopes where the Search operation is also applied by the server. The server should eliminate duplicate entries that arise due to alias dereferencing while searching.
     * - find - Dereferences aliases in locating the base object of the search, but not when searching subordinates of the base object.
     */
    derefAliases?: 'always' | 'find' | 'never' | 'search';
    /**
     * If true, attribute values should be included in the entries that are returned; otherwise entries that match the search criteria should be returned containing only the attribute descriptions for the attributes contained in that entry but should not include the values for those attributes.
     */
    returnAttributeValues?: boolean;
    /**
     * This specifies the maximum number of entries that should be returned from the search. A value of zero indicates no limit. Note that the server may also impose a size limit for the search operation, and in that case the smaller of the client-requested and server-imposed size limits will be enforced.
     */
    sizeLimit?: number;
    /**
     * This specifies the maximum length of time, in seconds, that the server should spend processing the search. A value of zero indicates no limit. Note that the server may also impose a time limit for the search operation, and in that case the smaller of the client-requested and server-imposed time limits will be enforced.
     */
    timeLimit?: number;
    /**
     * Used to allow paging and specify the page size
     */
    paged?: SearchPageOptions | boolean;
    /**
     * The filter of the search request. It must conform to the LDAP filter syntax specified in RFC4515
     */
    filter?: Filter | string;
    /**
     * A set of attributes to request for inclusion in entries that match the search criteria and are returned to the client. If a specific set of attribute descriptions are listed, then only those attributes should be included in matching entries. The special value “*” indicates that all user attributes should be included in matching entries. The special value “+” indicates that all operational attributes should be included in matching entries. The special value “1.1” indicates that no attributes should be included in matching entries. Some servers may also support the ability to use the “@” symbol followed by an object class name (e.g., “@inetOrgPerson”) to request all attributes associated with that object class. If the set of attributes to request is empty, then the server should behave as if the value “*” was specified to request that all user attributes be included in entries that are returned.
     */
    attributes?: string[];
    /**
     * List of attributes to explicitly return as buffers
     */
    explicitBufferAttributes?: string[];
}
interface SearchResult {
    searchEntries: Entry[];
    searchReferences: string[];
}
declare class Client {
    private clientOptions;
    private messageId;
    private readonly host;
    private readonly port;
    private readonly secure;
    private connected;
    private socket?;
    private connectTimer?;
    private readonly messageParser;
    private readonly messageDetailsByMessageId;
    constructor(options: ClientOptions);
    get isConnected(): boolean;
    startTLS(options?: tls.ConnectionOptions, controls?: Control | Control[]): Promise<void>;
    /**
     * Performs a simple or sasl authentication against the server.
     * @param {string|DN|SaslMechanism} dnOrSaslMechanism
     * @param {string} [password]
     * @param {Control|Control[]} [controls]
     */
    bind(dnOrSaslMechanism: DN | SaslMechanism | string, password?: string, controls?: Control | Control[]): Promise<void>;
    /**
     * Performs a sasl authentication against the server.
     * @param {string|SaslMechanism} mechanism
     * @param {string} [password]
     * @param {Control|Control[]} [controls]
     */
    bindSASL(mechanism: SaslMechanism | string, password?: string, controls?: Control | Control[]): Promise<void>;
    /**
     * Used to create a new entry in the directory
     * @param {string|DN} dn - The DN of the entry to add
     * @param {Attribute[]|object} attributes - Array of attributes or object where keys are the name of each attribute
     * @param {Control|Control[]} [controls]
     */
    add(dn: DN | string, attributes: Attribute[] | Record<string, string[] | string>, controls?: Control | Control[]): Promise<void>;
    /**
     * Compares an attribute/value pair with an entry on the LDAP server.
     * @param {string|DN} dn - The DN of the entry to compare attributes with
     * @param {string} attribute
     * @param {string} value
     * @param {Control|Control[]} [controls]
     */
    compare(dn: DN | string, attribute: string, value: string, controls?: Control | Control[]): Promise<boolean>;
    /**
     * Deletes an entry from the LDAP server.
     * @param {string|DN} dn - The DN of the entry to delete
     * @param {Control|Control[]} [controls]
     */
    del(dn: DN | string, controls?: Control | Control[]): Promise<void>;
    /**
     * Performs an extended operation on the LDAP server.
     * @param {string} oid - The object identifier (OID) of the extended operation to perform
     * @param {string|Buffer} [value]
     * @param {Control|Control[]} [controls]
     */
    exop(oid: string, value?: Buffer | string, controls?: Control | Control[]): Promise<{
        oid?: string;
        value?: string;
    }>;
    /**
     * Performs an LDAP modify against the server.
     * @param {string|DN} dn - The DN of the entry to modify
     * @param {Change|Change[]} changes
     * @param {Control|Control[]} [controls]
     */
    modify(dn: DN | string, changes: Change | Change[], controls?: Control | Control[]): Promise<void>;
    /**
     * Performs an LDAP modifyDN against the server.
     * @param {string|DN} dn - The DN of the entry to modify
     * @param {string|DN} newDN - The new DN to move this entry to
     * @param {Control|Control[]} [controls]
     */
    modifyDN(dn: DN | string, newDN: DN | string, controls?: Control | Control[]): Promise<void>;
    /**
     * Performs an LDAP search against the server.
     *
     * @param {string|DN} baseDN - This specifies the base of the subtree in which the search is to be constrained.
     * @param {SearchOptions} [options]
     * @param {string|Filter} [options.filter] - The filter of the search request. It must conform to the LDAP filter syntax specified in RFC4515. Defaults to (objectclass=*)
     * @param {string} [options.scope='sub'] - Specifies how broad the search context is:
     * - base - Indicates that only the entry specified as the search base should be considered. None of its subordinates will be considered.
     * - one - Indicates that only the immediate children of the entry specified as the search base should be considered. The base entry itself should not be considered, nor any descendants of the immediate children of the base entry.
     * - sub - Indicates that the entry specified as the search base, and all of its subordinates to any depth, should be considered.
     * - children - Indicates that the entry specified by the search base should not be considered, but all of its subordinates to any depth should be considered.
     * @param {string} [options.derefAliases='never'] - Specifies how the server must treat references to other entries:
     * - never - Never dereferences entries, returns alias objects instead. The alias contains the reference to the real entry.
     * - always - Always returns the referenced entries, not the alias object.
     * - search - While searching subordinates of the base object, dereferences any alias within the search scope. Dereferenced objects become the bases of further search scopes where the Search operation is also applied by the server. The server should eliminate duplicate entries that arise due to alias dereferencing while searching.
     * - find - Dereferences aliases in locating the base object of the search, but not when searching subordinates of the base object.
     * @param {boolean} [options.returnAttributeValues=true] - If true, attribute values should be included in the entries that are returned; otherwise entries that match the search criteria should be returned containing only the attribute descriptions for the attributes contained in that entry but should not include the values for those attributes.
     * @param {number} [options.sizeLimit=0] - This specifies the maximum number of entries that should be returned from the search. A value of zero indicates no limit. Note that the server may also impose a size limit for the search operation, and in that case the smaller of the client-requested and server-imposed size limits will be enforced.
     * @param {number} [options.timeLimit=10] - This specifies the maximum length of time, in seconds, that the server should spend processing the search. A value of zero indicates no limit. Note that the server may also impose a time limit for the search operation, and in that case the smaller of the client-requested and server-imposed time limits will be enforced.
     * @param {boolean|SearchPageOptions} [options.paged=false] - Used to allow paging and specify the page size
     * @param {string[]} [options.attributes] - A set of attributes to request for inclusion in entries that match the search criteria and are returned to the client. If a specific set of attribute descriptions are listed, then only those attributes should be included in matching entries. The special value “*” indicates that all user attributes should be included in matching entries. The special value “+” indicates that all operational attributes should be included in matching entries. The special value “1.1” indicates that no attributes should be included in matching entries. Some servers may also support the ability to use the “@” symbol followed by an object class name (e.g., “@inetOrgPerson”) to request all attributes associated with that object class. If the set of attributes to request is empty, then the server should behave as if the value “*” was specified to request that all user attributes be included in entries that are returned.
     * @param {string[]} [options.explicitBufferAttributes] - List of attributes to explicitly return as buffers
     * @param {Control|Control[]} [controls]
     */
    search(baseDN: DN | string, options?: SearchOptions, controls?: Control | Control[]): Promise<SearchResponse>;
    /**
     * Unbinds this client from the LDAP server.
     * @returns {void|Promise} void if not connected; otherwise returns a promise to the request to disconnect
     */
    unbind(): Promise<void>;
    private _sendBind;
    private _sendSearch;
    private readonly socketDataHandler;
    private _nextMessageId;
    /**
     * Open the socket connection
     * @returns {Promise<void>}
     * @private
     */
    private _connect;
    private _onConnect;
    private _endSocket;
    /**
     * Sends request message to the ldap server over the connected socket. Each message request is given a
     * unique id (messageId), used to identify the associated response when it is sent back over the socket.
     *
     * @returns {Promise<Message>}
     * @private
     * @param {object} message
     */
    private _send;
    private _handleSendResponse;
}

interface SearchRequestMessageOptions extends MessageOptions, SearchOptions {
    baseDN?: string;
    filter: Filter;
}
declare class SearchRequest extends Message {
    protocolOperation: ProtocolOperationValues;
    baseDN: string;
    scope: 'base' | 'children' | 'one' | 'sub';
    derefAliases: 'always' | 'find' | 'never' | 'search';
    sizeLimit: number;
    timeLimit: number;
    returnAttributeValues: boolean;
    filter: Filter;
    attributes: string[];
    explicitBufferAttributes: string[];
    constructor(options: SearchRequestMessageOptions);
    writeMessage(writer: BerWriter): void;
    parseMessage(reader: BerReader): void;
}

interface SearchResponseOptions extends MessageResponseOptions {
    searchEntries?: SearchEntry[];
    searchReferences?: SearchReference[];
}
declare class SearchResponse extends MessageResponse {
    protocolOperation: ProtocolOperationValues;
    searchEntries: SearchEntry[];
    searchReferences: SearchReference[];
    constructor(options: SearchResponseOptions);
}

declare class UnbindRequest extends Message {
    protocolOperation: ProtocolOperationValues;
    constructor(options: MessageOptions);
}

declare class ControlParser {
    static parse(reader: BerReader, requestControls: Control[]): Control | null;
}

declare class FilterParser {
    static parseString(filterString: string): Filter;
    static parse(reader: BerReader): Filter;
    private static _parseString;
    private static _parseExpressionFilterFromString;
    private static _parseExtensibleFilterFromString;
    private static _unescapeHexValues;
    private static _unescapeSubstring;
    private static _parseSet;
}

interface MessageParserEvents {
    message: (message: MessageResponse) => void;
    error: (error: Error) => void;
}
type MessageParserEmitter = StrictEventEmitter<EventEmitter, MessageParserEvents>;
declare const MessageParser_base: new () => MessageParserEmitter;
declare class MessageParser extends MessageParser_base {
    private buffer?;
    read(data: Buffer, messageDetailsByMessageId: Map<string, {
        message: Message;
    }>): void;
    private _getMessageFromProtocolOperation;
}

declare const MessageResponseStatus: {
    Success: 0;
    SizeLimitExceeded: 4;
};

declare class StatusCodeParser {
    static parse(result?: MessageResponse): ResultCodeError;
}

export { AbandonRequest, type AbandonRequestMessageOptions, type AddMessageOptions, AddRequest, AddResponse, AdminLimitExceededError, AffectsMultipleDSAsError, AliasDerefProblemError, AliasProblemError, AlreadyExistsError, AndFilter, type AndFilterOptions, ApproximateFilter, type ApproximateFilterOptions, Attribute, type AttributeOptions, AuthMethodNotSupportedError, BindRequest, type BindRequestMessageOptions, BindResponse, BusyError, Change, type ChangeOptions, Client, type ClientOptions, CompareRequest, type CompareRequestMessageOptions, CompareResponse, CompareResult, ConfidentialityRequiredError, ConstraintViolationError, Control, type ControlOptions, ControlParser, DN, DeleteRequest, type DeleteRequestMessageOptions, DeleteResponse, type Entry, EntryChangeNotificationControl, type EntryChangeNotificationControlOptions, type EntryChangeNotificationControlValue, EqualityFilter, type EqualityFilterOptions, ExtendedRequest, type ExtendedRequestMessageOptions, ExtendedResponse, type ExtendedResponseOptions, ExtendedResponseProtocolOperations, ExtensibleFilter, type ExtensibleFilterOptions, FilterParser, GreaterThanEqualsFilter, type GreaterThanEqualsFilterOptions, InappropriateAuthError, InappropriateMatchingError, InsufficientAccessError, InvalidCredentialsError, InvalidDNSyntaxError, InvalidSyntaxError, IsLeafError, LessThanEqualsFilter, type LessThanEqualsFilterOptions, LoopDetectError, MessageParser, MessageParserError, type MessageParserErrorDetails, MessageResponseStatus, ModifyDNRequest, type ModifyDNRequestMessageOptions, ModifyDNResponse, ModifyRequest, type ModifyRequestMessageOptions, ModifyResponse, NamingViolationError, NoObjectClassModsError, NoResultError, NoSuchAttributeError, NoSuchObjectError, NotAllowedOnNonLeafError, NotAllowedOnRDNError, NotFilter, type NotFilterOptions, ObjectClassViolationError, OperationsError, OrFilter, type OrFilterOptions, PagedResultsControl, type PagedResultsControlOptions, type PagedResultsValue, PersistentSearchControl, type PersistentSearchControlOptions, type PersistentSearchValue, PresenceFilter, type PresenceFilterOptions, ProtocolError, ProtocolOperation, type ProtocolOperationValues, type RDNMap, ResultCodeError, ResultsTooLargeError, SASL_MECHANISMS, SaslBindInProgressError, type SaslMechanism, SearchEntry, type SearchEntryOptions, SearchFilter, type SearchFilterValues, type SearchOptions, type SearchPageOptions, SearchReference, type SearchReferenceOptions, SearchRequest, type SearchRequestMessageOptions, SearchResponse, type SearchResponseOptions, type SearchResult, ServerSideSortingRequestControl, type ServerSideSortingRequestControlOptions, type ServerSideSortingRequestValue, SizeLimitExceededError, StatusCodeParser, StrongAuthRequiredError, SubstringFilter, type SubstringFilterOptions, TLSNotSupportedError, TimeLimitExceededError, TypeOrValueExistsError, UnavailableCriticalExtensionError, UnavailableError, UnbindRequest, UndefinedTypeError, UnknownStatusCodeError, UnwillingToPerformError };
