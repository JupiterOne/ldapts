'use strict';

const asn1 = require('asn1');
const assert = require('assert');
const net = require('net');
const tls = require('tls');
const url = require('url');
const debug = require('debug');
const uuid = require('uuid');
const events = require('events');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

function _interopNamespaceCompat(e) {
  if (e && typeof e === 'object' && 'default' in e) return e;
  const n = Object.create(null);
  if (e) {
    for (const k in e) {
      n[k] = e[k];
    }
  }
  n.default = e;
  return n;
}

const asn1__default = /*#__PURE__*/_interopDefaultCompat(asn1);
const assert__namespace = /*#__PURE__*/_interopNamespaceCompat(assert);
const net__namespace = /*#__PURE__*/_interopNamespaceCompat(net);
const tls__namespace = /*#__PURE__*/_interopNamespaceCompat(tls);
const debug__default = /*#__PURE__*/_interopDefaultCompat(debug);

var __defProp$J = Object.defineProperty;
var __defNormalProp$J = (obj, key, value) => key in obj ? __defProp$J(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$J = (obj, key, value) => {
  __defNormalProp$J(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Control {
  constructor(type, options = {}) {
    __publicField$J(this, "type");
    __publicField$J(this, "critical");
    this.type = type;
    this.critical = options.critical === true;
  }
  write(writer) {
    writer.startSequence();
    writer.writeString(this.type);
    writer.writeBoolean(this.critical);
    this.writeControl(writer);
    writer.endSequence();
  }
  parse(reader) {
    this.parseControl(reader);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  writeControl(_) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parseControl(_) {
  }
}

var __defProp$I = Object.defineProperty;
var __defNormalProp$I = (obj, key, value) => key in obj ? __defProp$I(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$I = (obj, key, value) => {
  __defNormalProp$I(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const { BerWriter: BerWriter$4 } = asn1__default;
const _EntryChangeNotificationControl = class _EntryChangeNotificationControl extends Control {
  constructor(options = {}) {
    super(_EntryChangeNotificationControl.type, options);
    __publicField$I(this, "value");
    this.value = options.value;
  }
  parseControl(reader) {
    if (reader.readSequence()) {
      const changeType = reader.readInt() ?? 0;
      let previousDN;
      if (changeType === 8) {
        previousDN = reader.readString();
      }
      const changeNumber = reader.readInt() ?? 0;
      this.value = {
        changeType,
        previousDN,
        changeNumber
      };
    }
  }
  writeControl(writer) {
    if (!this.value) {
      return;
    }
    const controlWriter = new BerWriter$4();
    controlWriter.startSequence();
    controlWriter.writeInt(this.value.changeType);
    if (this.value.previousDN) {
      controlWriter.writeString(this.value.previousDN);
    }
    controlWriter.writeInt(this.value.changeNumber);
    controlWriter.endSequence();
    writer.writeBuffer(controlWriter.buffer, 4);
  }
};
__publicField$I(_EntryChangeNotificationControl, "type", "2.16.840.1.113730.3.4.7");
let EntryChangeNotificationControl = _EntryChangeNotificationControl;

var __defProp$H = Object.defineProperty;
var __defNormalProp$H = (obj, key, value) => key in obj ? __defProp$H(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$H = (obj, key, value) => {
  __defNormalProp$H(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const { Ber: Ber$5, BerWriter: BerWriter$3 } = asn1__default;
const _PagedResultsControl = class _PagedResultsControl extends Control {
  constructor(options = {}) {
    super(_PagedResultsControl.type, options);
    __publicField$H(this, "value");
    this.value = options.value;
  }
  parseControl(reader) {
    if (reader.readSequence()) {
      const size = reader.readInt() ?? 0;
      const cookie = reader.readString(Ber$5.OctetString, true) ?? Buffer.alloc(0);
      this.value = {
        size,
        cookie
      };
    }
  }
  writeControl(writer) {
    if (!this.value) {
      return;
    }
    const controlWriter = new BerWriter$3();
    controlWriter.startSequence();
    controlWriter.writeInt(this.value.size);
    if (this.value.cookie?.length) {
      controlWriter.writeBuffer(this.value.cookie, Ber$5.OctetString);
    } else {
      controlWriter.writeString("");
    }
    controlWriter.endSequence();
    writer.writeBuffer(controlWriter.buffer, 4);
  }
};
__publicField$H(_PagedResultsControl, "type", "1.2.840.113556.1.4.319");
let PagedResultsControl = _PagedResultsControl;

var __defProp$G = Object.defineProperty;
var __defNormalProp$G = (obj, key, value) => key in obj ? __defProp$G(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$G = (obj, key, value) => {
  __defNormalProp$G(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const { BerWriter: BerWriter$2 } = asn1__default;
const _PersistentSearchControl = class _PersistentSearchControl extends Control {
  constructor(options = {}) {
    super(_PersistentSearchControl.type, options);
    __publicField$G(this, "value");
    this.value = options.value;
  }
  parseControl(reader) {
    if (reader.readSequence()) {
      const changeTypes = reader.readInt() ?? 0;
      const changesOnly = reader.readBoolean() ?? false;
      const returnECs = reader.readBoolean() ?? false;
      this.value = {
        changeTypes,
        changesOnly,
        returnECs
      };
    }
  }
  writeControl(writer) {
    if (!this.value) {
      return;
    }
    const controlWriter = new BerWriter$2();
    controlWriter.startSequence();
    controlWriter.writeInt(this.value.changeTypes);
    controlWriter.writeBoolean(this.value.changesOnly);
    controlWriter.writeBoolean(this.value.returnECs);
    controlWriter.endSequence();
    writer.writeBuffer(controlWriter.buffer, 4);
  }
};
__publicField$G(_PersistentSearchControl, "type", "2.16.840.1.113730.3.4.3");
let PersistentSearchControl = _PersistentSearchControl;

var __defProp$F = Object.defineProperty;
var __defNormalProp$F = (obj, key, value) => key in obj ? __defProp$F(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$F = (obj, key, value) => {
  __defNormalProp$F(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const { Ber: Ber$4, BerWriter: BerWriter$1 } = asn1__default;
const _ServerSideSortingRequestControl = class _ServerSideSortingRequestControl extends Control {
  constructor(options = {}) {
    super(_ServerSideSortingRequestControl.type, options);
    __publicField$F(this, "values");
    if (Array.isArray(options.value)) {
      this.values = options.value;
    } else if (typeof options.value === "object") {
      this.values = [options.value];
    } else {
      this.values = [];
    }
  }
  parseControl(reader) {
    if (reader.readSequence(48)) {
      while (reader.readSequence(48)) {
        const attributeType = reader.readString() ?? "";
        let orderingRule = "";
        let reverseOrder = false;
        if (reader.peek() === 128) {
          orderingRule = reader.readString(128) ?? "";
        }
        if (reader.peek() === 129) {
          reverseOrder = reader._readTag(129) !== 0;
        }
        this.values.push({
          attributeType,
          orderingRule,
          reverseOrder
        });
      }
    }
  }
  writeControl(writer) {
    if (!this.values.length) {
      return;
    }
    const controlWriter = new BerWriter$1();
    controlWriter.startSequence(48);
    for (const value of this.values) {
      controlWriter.startSequence(48);
      controlWriter.writeString(value.attributeType, Ber$4.OctetString);
      if (value.orderingRule) {
        controlWriter.writeString(value.orderingRule, 128);
      }
      if (typeof value.reverseOrder !== "undefined") {
        controlWriter.writeBoolean(value.reverseOrder, 129);
      }
      controlWriter.endSequence();
    }
    controlWriter.endSequence();
    writer.writeBuffer(controlWriter.buffer, 4);
  }
};
__publicField$F(_ServerSideSortingRequestControl, "type", "2.16.840.1.113730.3.4.3");
let ServerSideSortingRequestControl = _ServerSideSortingRequestControl;

var __defProp$E = Object.defineProperty;
var __defNormalProp$E = (obj, key, value) => key in obj ? __defProp$E(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$E = (obj, key, value) => {
  __defNormalProp$E(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class RDN {
  constructor(attrs) {
    __publicField$E(this, "attrs", {});
    if (attrs) {
      for (const [key, value] of Object.entries(attrs)) {
        this.set(key, value);
      }
    }
  }
  /**
   * Set an RDN pair.
   * @param {string} name
   * @param {string} value
   * @returns {object} RDN class
   */
  set(name, value) {
    this.attrs[name] = value;
    return this;
  }
  /**
   * Get an RDN value at the specified name.
   * @param {string} name
   * @returns {string | undefined} value
   */
  get(name) {
    return this.attrs[name];
  }
  /**
   * Checks, if this instance of RDN is equal to the other RDN.
   * @param {object} other
   */
  equals(other) {
    const ourKeys = Object.keys(this.attrs);
    const otherKeys = Object.keys(other.attrs);
    if (ourKeys.length !== otherKeys.length) {
      return false;
    }
    ourKeys.sort();
    otherKeys.sort();
    for (let i = 0; i < ourKeys.length; i += 1) {
      const key = ourKeys[i];
      if (key == null || ourKeys[i] !== otherKeys[i]) {
        return false;
      }
      const ourValue = this.attrs[key];
      const otherValue = other.attrs[key];
      if (ourValue == null && otherValue == null) {
        continue;
      }
      if (ourValue == null || otherValue == null || ourValue !== otherValue) {
        return false;
      }
    }
    return true;
  }
  /**
   * Parse the RDN, escape values & return a string representation.
   * @returns {string} Escaped string representation of RDN.
   */
  toString() {
    let str = "";
    for (const [key, value] of Object.entries(this.attrs)) {
      if (str) {
        str += "+";
      }
      str += `${key}=${this._escape(value)}`;
    }
    return str;
  }
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
  _escape(value = "") {
    let str = "";
    let current = 0;
    let quoted = false;
    const len = value.length;
    const escaped = /[\\"]/;
    const special = /[,=+<>#;]/;
    if (len > 0) {
      quoted = value.startsWith(" ") || value[len - 1] === " ";
    }
    while (current < len) {
      const character = value[current] ?? "";
      if (escaped.test(character) || !quoted && special.test(character)) {
        str += "\\";
      }
      if (character) {
        str += character;
      }
      current += 1;
    }
    if (quoted) {
      str = `"${str}"`;
    }
    return str;
  }
}

var __defProp$D = Object.defineProperty;
var __defNormalProp$D = (obj, key, value) => key in obj ? __defProp$D(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$D = (obj, key, value) => {
  __defNormalProp$D(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DN {
  constructor(rdns) {
    __publicField$D(this, "rdns", []);
    if (rdns) {
      if (Array.isArray(rdns)) {
        this.rdns = rdns;
      } else {
        this.addRDNs(rdns);
      }
    }
  }
  /**
   * Add an RDN component to the DN, consisting of key & value pair.
   * @param {string} key
   * @param {string} value
   * @returns {object} DN
   */
  addPairRDN(key, value) {
    this.rdns.push(new RDN({ [key]: value }));
    return this;
  }
  /**
   * Add a single RDN component to the DN.
   *
   * Note, that this RDN can be compound (single RDN can have multiple key & value pairs).
   * @param {object} rdn
   * @returns {object} DN
   */
  addRDN(rdn) {
    if (rdn instanceof RDN) {
      this.rdns.push(rdn);
    } else {
      this.rdns.push(new RDN(rdn));
    }
    return this;
  }
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
  addRDNs(rdns) {
    if (rdns instanceof DN) {
      this.rdns.push(...rdns.rdns);
    } else if (Array.isArray(rdns)) {
      for (const rdn of rdns) {
        this.addRDN(rdn);
      }
    } else {
      for (const [name, value] of Object.entries(rdns)) {
        if (Array.isArray(value)) {
          for (const rdnValue of value) {
            this.rdns.push(
              new RDN({
                [name]: rdnValue
              })
            );
          }
        } else {
          this.rdns.push(
            new RDN({
              [name]: value
            })
          );
        }
      }
    }
    return this;
  }
  getRDNs() {
    return this.rdns;
  }
  get(index) {
    return this.rdns[index];
  }
  set(rdn, index) {
    if (rdn instanceof RDN) {
      this.rdns[index] = rdn;
    } else {
      this.rdns[index] = new RDN(rdn);
    }
    return this;
  }
  isEmpty() {
    return !this.rdns.length;
  }
  /**
   * Checks, if this instance of DN is equal to the other DN.
   * @param {object} other
   */
  equals(other) {
    if (this.rdns.length !== other.rdns.length) {
      return false;
    }
    for (let i = 0; i < this.rdns.length; i += 1) {
      const rdn = this.rdns[i];
      const otherRdn = other.rdns[i];
      if (rdn == null && otherRdn == null) {
        continue;
      }
      if (rdn == null || otherRdn == null || !rdn.equals(otherRdn)) {
        return false;
      }
    }
    return true;
  }
  clone() {
    return new DN([...this.rdns]);
  }
  reverse() {
    this.rdns.reverse();
    return this;
  }
  pop() {
    return this.rdns.pop();
  }
  shift() {
    return this.rdns.shift();
  }
  /**
   * Parse the DN, escape values & return a string representation.
   */
  toString() {
    let str = "";
    for (const rdn of this.rdns) {
      if (str.length) {
        str += ",";
      }
      str += rdn.toString();
    }
    return str;
  }
}

var __defProp$C = Object.defineProperty;
var __defNormalProp$C = (obj, key, value) => key in obj ? __defProp$C(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$C = (obj, key, value) => {
  __defNormalProp$C(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class MessageParserError extends Error {
  constructor() {
    super(...arguments);
    __publicField$C(this, "messageDetails");
  }
}

var __defProp$B = Object.defineProperty;
var __defNormalProp$B = (obj, key, value) => key in obj ? __defProp$B(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$B = (obj, key, value) => {
  __defNormalProp$B(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ResultCodeError extends Error {
  constructor(code, message) {
    super();
    __publicField$B(this, "code");
    this.code = code;
    this.message = `${message} Code: 0x${code.toString(16)}`;
  }
}

class AdminLimitExceededError extends ResultCodeError {
  constructor(message) {
    super(11, message ?? "An LDAP server limit set by an administrative authority has been exceeded.");
  }
}

class AffectsMultipleDSAsError extends ResultCodeError {
  constructor(message) {
    super(71, message ?? "The modify DN operation moves the entry from one LDAP server to another and thus requires more than one LDAP server.");
  }
}

class AliasDerefProblemError extends ResultCodeError {
  constructor(message) {
    super(36, message ?? "Either the client does not have access rights to read the aliased object's name or dereferencing is not allowed.");
  }
}

class AliasProblemError extends ResultCodeError {
  constructor(message) {
    super(33, message ?? "An error occurred when an alias was dereferenced.");
  }
}

class AlreadyExistsError extends ResultCodeError {
  constructor(message) {
    super(68, message ?? "The add operation attempted to add an entry that already exists, or that the modify operation attempted to rename an entry to the name of an entry that already exists.");
  }
}

class AuthMethodNotSupportedError extends ResultCodeError {
  constructor(message) {
    super(7, message ?? "The Directory Server does not support the requested Authentication Method.");
  }
}

class BusyError extends ResultCodeError {
  constructor(message) {
    super(51, message ?? "The LDAP server is too busy to process the client request at this time.");
  }
}

class ConfidentialityRequiredError extends ResultCodeError {
  constructor(message) {
    super(
      13,
      message ?? "The session is not protected by a protocol such as Transport Layer Security (TLS), which provides session confidentiality and the request will not be handled without confidentiality enabled."
    );
  }
}

class ConstraintViolationError extends ResultCodeError {
  constructor(message) {
    super(
      19,
      message ?? "The attribute value specified in a Add Request, Modify Request or ModifyDNRequest operation violates constraints placed on the attribute. The constraint can be one of size or content (string only, no binary)."
    );
  }
}

class InappropriateAuthError extends ResultCodeError {
  constructor(message) {
    super(48, message ?? "The client is attempting to use an authentication method incorrectly.");
  }
}

class InappropriateMatchingError extends ResultCodeError {
  constructor(message) {
    super(18, message ?? "The matching rule specified in the search filter does not match a rule defined for the attribute's syntax.");
  }
}

class InsufficientAccessError extends ResultCodeError {
  constructor(message) {
    super(50, message ?? "The caller does not have sufficient rights to perform the requested operation.");
  }
}

class InvalidCredentialsError extends ResultCodeError {
  constructor(message) {
    super(49, message ?? "Invalid credentials during a bind operation.");
  }
}

class InvalidDNSyntaxError extends ResultCodeError {
  constructor(message) {
    super(34, message ?? "The syntax of the DN is incorrect.");
  }
}

class InvalidSyntaxError extends ResultCodeError {
  constructor(message) {
    super(21, message ?? "The attribute value specified in an Add Request, Compare Request, or Modify Request operation is an unrecognized or invalid syntax for the attribute.");
  }
}

class IsLeafError extends ResultCodeError {
  constructor(message) {
    super(35, message ?? "The specified operation cannot be performed on a leaf entry.");
  }
}

class LoopDetectError extends ResultCodeError {
  constructor(message) {
    super(54, message ?? "The client discovered an alias or LDAP Referral loop, and is thus unable to complete this request.");
  }
}

class NamingViolationError extends ResultCodeError {
  constructor(message) {
    super(64, message ?? "The Add Request or Modify DN Request operation violates the schema's structure rules.");
  }
}

class NoObjectClassModsError extends ResultCodeError {
  constructor(message) {
    super(69, message ?? "The modify operation attempted to modify the structure rules of an object class.");
  }
}

class NoSuchAttributeError extends ResultCodeError {
  constructor(message) {
    super(16, message ?? "The attribute specified in the Modify Request or Compare Request operation does not exist in the entry.");
  }
}

class NoSuchObjectError extends ResultCodeError {
  constructor(message) {
    super(32, message ?? "The target object cannot be found.");
  }
}

class NotAllowedOnNonLeafError extends ResultCodeError {
  constructor(message) {
    super(66, message ?? "The requested operation is permitted only on leaf entries.");
  }
}

class NotAllowedOnRDNError extends ResultCodeError {
  constructor(message) {
    super(67, message ?? "The modify operation attempted to remove an attribute value that forms the entry's relative distinguished name.");
  }
}

class NoResultError extends ResultCodeError {
  constructor(message) {
    super(248, message ?? "No result message for the request.");
  }
}

class ObjectClassViolationError extends ResultCodeError {
  constructor(message) {
    super(65, message ?? "The Add Request, Modify Request, or modify DN operation violates the object class rules for the entry.");
  }
}

class OperationsError extends ResultCodeError {
  constructor(message) {
    super(1, message ?? "Request was out of sequence with another operation in progress.");
  }
}

class ProtocolError extends ResultCodeError {
  constructor(message) {
    super(2, message ?? "Client sent data to the server that did not comprise a valid LDAP request.");
  }
}

class ResultsTooLargeError extends ResultCodeError {
  constructor(message) {
    super(70, message ?? "Results are too large.");
  }
}

var __defProp$A = Object.defineProperty;
var __defNormalProp$A = (obj, key, value) => key in obj ? __defProp$A(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$A = (obj, key, value) => {
  __defNormalProp$A(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SaslBindInProgressError extends ResultCodeError {
  constructor(response) {
    super(14, response.errorMessage || "The server is ready for the next step in the SASL authentication process. The client must send the server the same SASL Mechanism to continue the process.");
    __publicField$A(this, "response");
    this.response = response;
  }
}

class SizeLimitExceededError extends ResultCodeError {
  constructor(message) {
    super(4, message ?? "There were more entries matching the criteria contained in a SearchRequest operation than were allowed to be returned by the size limit configuration.");
  }
}

class StrongAuthRequiredError extends ResultCodeError {
  constructor(message) {
    super(8, message ?? "Client requested an operation that requires strong authentication.");
  }
}

class TimeLimitExceededError extends ResultCodeError {
  constructor(message) {
    super(
      3,
      message ?? "Processing on the associated request Timeout limit specified by either the client request or the server administration limits has been exceeded and has been terminated because it took too long to complete."
    );
  }
}

class TLSNotSupportedError extends ResultCodeError {
  constructor(message) {
    super(112, message ?? "TLS is not supported on the server.");
  }
}

class TypeOrValueExistsError extends ResultCodeError {
  constructor(message) {
    super(20, message ?? "The attribute value specified in a Add Request or Modify Request operation already exists as a value for that attribute.");
  }
}

class UnavailableCriticalExtensionError extends ResultCodeError {
  constructor(message) {
    super(
      12,
      message ?? "One or more critical extensions were not available by the LDAP server. Either the server does not support the control or the control is not appropriate for the operation type."
    );
  }
}

class UnavailableError extends ResultCodeError {
  constructor(message) {
    super(52, message ?? "The LDAP server cannot process the client's bind request.");
  }
}

class UndefinedTypeError extends ResultCodeError {
  constructor(message) {
    super(17, message ?? "The attribute specified in the modify or add operation does not exist in the LDAP server's schema.");
  }
}

class UnknownStatusCodeError extends ResultCodeError {
  constructor(code, message) {
    super(code, message ?? "Unknown error.");
  }
}

class UnwillingToPerformError extends ResultCodeError {
  constructor(message) {
    super(53, message ?? "The LDAP server cannot process the request because of server-defined restrictions.");
  }
}

const SearchFilter = {
  and: 160,
  or: 161,
  not: 162,
  equalityMatch: 163,
  substrings: 164,
  greaterOrEqual: 165,
  lessOrEqual: 166,
  present: 135,
  approxMatch: 168,
  extensibleMatch: 169
};

class Filter {
  write(writer) {
    writer.startSequence(this.type);
    this.writeFilter(writer);
    writer.endSequence();
  }
  parse(reader) {
    this.parseFilter(reader);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  matches(_ = {}, __) {
    return true;
  }
  /**
   * RFC 2254 Escaping of filter strings
   * Raw                     Escaped
   * (o=Parens (R Us))       (o=Parens \28R Us\29)
   * (cn=star*)              (cn=star\2A)
   * (filename=C:\MyFile)    (filename=C:\5cMyFile)
   *
   * @param {string|Buffer} input
   */
  escape(input) {
    let escapedResult = "";
    if (Buffer.isBuffer(input)) {
      for (const inputChar of input) {
        if (inputChar < 16) {
          escapedResult += `\\0${inputChar.toString(16)}`;
        } else {
          escapedResult += `\\${inputChar.toString(16)}`;
        }
      }
    } else {
      for (const inputChar of input) {
        switch (inputChar) {
          case "*":
            escapedResult += "\\2a";
            break;
          case "(":
            escapedResult += "\\28";
            break;
          case ")":
            escapedResult += "\\29";
            break;
          case "\\":
            escapedResult += "\\5c";
            break;
          case "\0":
            escapedResult += "\\00";
            break;
          default:
            escapedResult += inputChar;
            break;
        }
      }
    }
    return escapedResult;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parseFilter(_) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  writeFilter(_) {
  }
  getObjectValue(objectToCheck, key, strictAttributeCase) {
    let objectKey;
    if (typeof objectToCheck[key] !== "undefined") {
      objectKey = key;
    } else if (!strictAttributeCase && key.toLowerCase() === "objectclass") {
      for (const objectToCheckKey of Object.keys(objectToCheck)) {
        if (objectToCheckKey.toLowerCase() === key.toLowerCase()) {
          objectKey = objectToCheckKey;
          break;
        }
      }
    }
    if (objectKey) {
      return objectToCheck[objectKey];
    }
    return void 0;
  }
}

var __defProp$z = Object.defineProperty;
var __defNormalProp$z = (obj, key, value) => key in obj ? __defProp$z(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$z = (obj, key, value) => {
  __defNormalProp$z(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AndFilter extends Filter {
  constructor(options) {
    super();
    __publicField$z(this, "type", SearchFilter.and);
    __publicField$z(this, "filters");
    this.filters = options.filters;
  }
  writeFilter(writer) {
    for (const filter of this.filters) {
      filter.write(writer);
    }
  }
  matches(objectToCheck = {}, strictAttributeCase) {
    if (!this.filters.length) {
      return true;
    }
    for (const filter of this.filters) {
      if (!filter.matches(objectToCheck, strictAttributeCase)) {
        return false;
      }
    }
    return true;
  }
  toString() {
    let result = "(&";
    for (const filter of this.filters) {
      result += filter.toString();
    }
    result += ")";
    return result;
  }
}

var __defProp$y = Object.defineProperty;
var __defNormalProp$y = (obj, key, value) => key in obj ? __defProp$y(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$y = (obj, key, value) => {
  __defNormalProp$y(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ApproximateFilter extends Filter {
  constructor(options = {}) {
    super();
    __publicField$y(this, "type", SearchFilter.approxMatch);
    __publicField$y(this, "attribute");
    __publicField$y(this, "value");
    this.attribute = options.attribute ?? "";
    this.value = options.value ?? "";
  }
  parseFilter(reader) {
    this.attribute = (reader.readString() ?? "").toLowerCase();
    this.value = reader.readString() ?? "";
  }
  writeFilter(writer) {
    writer.writeString(this.attribute);
    writer.writeString(this.value);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  matches(_ = {}, __) {
    throw new Error("Approximate match implementation unknown");
  }
  toString() {
    return `(${this.escape(this.attribute)}~=${this.escape(this.value)})`;
  }
}

var __defProp$x = Object.defineProperty;
var __defNormalProp$x = (obj, key, value) => key in obj ? __defProp$x(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$x = (obj, key, value) => {
  __defNormalProp$x(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const { Ber: Ber$3 } = asn1__default;
class EqualityFilter extends Filter {
  constructor(options = {}) {
    super();
    __publicField$x(this, "type", SearchFilter.equalityMatch);
    __publicField$x(this, "attribute");
    __publicField$x(this, "value");
    this.attribute = options.attribute ?? "";
    this.value = options.value ?? "";
  }
  parseFilter(reader) {
    this.attribute = (reader.readString() ?? "").toLowerCase();
    this.value = reader.readString() ?? "";
    if (this.attribute === "objectclass") {
      this.value = this.value.toLowerCase();
    }
  }
  writeFilter(writer) {
    writer.writeString(this.attribute);
    if (Buffer.isBuffer(this.value)) {
      writer.writeBuffer(this.value, Ber$3.OctetString);
    } else {
      writer.writeString(this.value);
    }
  }
  matches(objectToCheck = {}, strictAttributeCase) {
    const objectToCheckValue = this.getObjectValue(objectToCheck, this.attribute, strictAttributeCase);
    if (typeof objectToCheckValue !== "undefined") {
      if (Buffer.isBuffer(this.value) && Buffer.isBuffer(objectToCheckValue)) {
        return this.value === objectToCheckValue;
      }
      const stringValue = Buffer.isBuffer(this.value) ? this.value.toString("utf8") : this.value;
      if (strictAttributeCase) {
        return stringValue === objectToCheckValue;
      }
      return stringValue.toLowerCase() === objectToCheckValue.toLowerCase();
    }
    return false;
  }
  toString() {
    return `(${this.escape(this.attribute)}=${this.escape(this.value)})`;
  }
}

var __defProp$w = Object.defineProperty;
var __defNormalProp$w = (obj, key, value) => key in obj ? __defProp$w(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$w = (obj, key, value) => {
  __defNormalProp$w(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ExtensibleFilter extends Filter {
  constructor(options = {}) {
    super();
    __publicField$w(this, "type", SearchFilter.extensibleMatch);
    __publicField$w(this, "value");
    __publicField$w(this, "rule");
    __publicField$w(this, "matchType");
    __publicField$w(this, "dnAttributes");
    this.matchType = options.matchType ?? "";
    this.rule = options.rule ?? "";
    this.dnAttributes = options.dnAttributes === true;
    this.value = options.value ?? "";
  }
  parseFilter(reader) {
    const end = reader.offset + reader.length;
    while (reader.offset < end) {
      const tag = reader.peek();
      switch (tag) {
        case 129:
          this.rule = reader.readString(tag) ?? "";
          break;
        case 130:
          this.matchType = reader.readString(tag) ?? "";
          break;
        case 131:
          this.value = reader.readString(tag) ?? "";
          break;
        case 132:
          this.dnAttributes = reader.readBoolean() ?? false;
          break;
        default: {
          let type = "<null>";
          if (tag) {
            type = `0x${tag.toString(16)}`;
          }
          throw new Error(`Invalid ext_match filter type: ${type}`);
        }
      }
    }
  }
  writeFilter(writer) {
    if (this.rule) {
      writer.writeString(this.rule, 129);
    }
    if (this.matchType) {
      writer.writeString(this.matchType, 130);
    }
    writer.writeString(this.value, 131);
    if (this.dnAttributes) {
      writer.writeBoolean(this.dnAttributes, 132);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  matches(_ = {}, __) {
    throw new Error("Approximate match implementation unknown");
  }
  toString() {
    let result = `(${this.escape(this.matchType)}:`;
    if (this.dnAttributes) {
      result += "dn:";
    }
    if (this.rule) {
      result += `${this.escape(this.rule)}:`;
    }
    result += `=${this.escape(this.value)})`;
    return result;
  }
}

var __defProp$v = Object.defineProperty;
var __defNormalProp$v = (obj, key, value) => key in obj ? __defProp$v(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$v = (obj, key, value) => {
  __defNormalProp$v(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class GreaterThanEqualsFilter extends Filter {
  constructor(options = {}) {
    super();
    __publicField$v(this, "type", SearchFilter.greaterOrEqual);
    __publicField$v(this, "attribute");
    __publicField$v(this, "value");
    this.attribute = options.attribute ?? "";
    this.value = options.value ?? "";
  }
  parseFilter(reader) {
    this.attribute = reader.readString()?.toLowerCase() ?? "";
    this.value = reader.readString() ?? "";
  }
  writeFilter(writer) {
    writer.writeString(this.attribute);
    writer.writeString(this.value);
  }
  matches(objectToCheck = {}, strictAttributeCase) {
    const objectToCheckValue = this.getObjectValue(objectToCheck, this.attribute, strictAttributeCase);
    if (typeof objectToCheckValue !== "undefined") {
      if (strictAttributeCase) {
        return objectToCheckValue >= this.value;
      }
      return objectToCheckValue.toLowerCase() >= this.value.toLowerCase();
    }
    return false;
  }
  toString() {
    return `(${this.escape(this.attribute)}>=${this.escape(this.value)})`;
  }
}

var __defProp$u = Object.defineProperty;
var __defNormalProp$u = (obj, key, value) => key in obj ? __defProp$u(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$u = (obj, key, value) => {
  __defNormalProp$u(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class LessThanEqualsFilter extends Filter {
  constructor(options = {}) {
    super();
    __publicField$u(this, "type", SearchFilter.lessOrEqual);
    __publicField$u(this, "attribute");
    __publicField$u(this, "value");
    this.attribute = options.attribute ?? "";
    this.value = options.value ?? "";
  }
  parseFilter(reader) {
    this.attribute = reader.readString()?.toLowerCase() ?? "";
    this.value = reader.readString() ?? "";
  }
  writeFilter(writer) {
    writer.writeString(this.attribute);
    writer.writeString(this.value);
  }
  matches(objectToCheck = {}, strictAttributeCase) {
    const objectToCheckValue = this.getObjectValue(objectToCheck, this.attribute, strictAttributeCase);
    if (typeof objectToCheckValue !== "undefined") {
      if (strictAttributeCase) {
        return objectToCheckValue <= this.value;
      }
      return objectToCheckValue.toLowerCase() <= this.value.toLowerCase();
    }
    return false;
  }
  toString() {
    return `(${this.escape(this.attribute)}<=${this.escape(this.value)})`;
  }
}

var __defProp$t = Object.defineProperty;
var __defNormalProp$t = (obj, key, value) => key in obj ? __defProp$t(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$t = (obj, key, value) => {
  __defNormalProp$t(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NotFilter extends Filter {
  constructor(options) {
    super();
    __publicField$t(this, "type", SearchFilter.not);
    __publicField$t(this, "filter");
    this.filter = options.filter;
  }
  writeFilter(writer) {
    this.filter.write(writer);
  }
  matches(objectToCheck = {}, strictAttributeCase) {
    return !this.filter.matches(objectToCheck, strictAttributeCase);
  }
  toString() {
    return `(!${this.filter.toString()})`;
  }
}

var __defProp$s = Object.defineProperty;
var __defNormalProp$s = (obj, key, value) => key in obj ? __defProp$s(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$s = (obj, key, value) => {
  __defNormalProp$s(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class OrFilter extends Filter {
  constructor(options) {
    super();
    __publicField$s(this, "type", SearchFilter.or);
    __publicField$s(this, "filters");
    this.filters = options.filters;
  }
  writeFilter(writer) {
    for (const filter of this.filters) {
      filter.write(writer);
    }
  }
  matches(objectToCheck = {}, strictAttributeCase) {
    if (!this.filters.length) {
      return true;
    }
    for (const filter of this.filters) {
      if (filter.matches(objectToCheck, strictAttributeCase)) {
        return true;
      }
    }
    return false;
  }
  toString() {
    let result = "(|";
    for (const filter of this.filters) {
      result += filter.toString();
    }
    result += ")";
    return result;
  }
}

var __defProp$r = Object.defineProperty;
var __defNormalProp$r = (obj, key, value) => key in obj ? __defProp$r(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$r = (obj, key, value) => {
  __defNormalProp$r(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PresenceFilter extends Filter {
  constructor(options = {}) {
    super();
    __publicField$r(this, "type", SearchFilter.present);
    __publicField$r(this, "attribute");
    this.attribute = options.attribute ?? "";
  }
  parseFilter(reader) {
    this.attribute = reader.buffer.slice(0, reader.length).toString("utf8").toLowerCase();
    reader._offset += reader.length;
  }
  writeFilter(writer) {
    for (let i = 0; i < this.attribute.length; i += 1) {
      writer.writeByte(this.attribute.charCodeAt(i));
    }
  }
  matches(objectToCheck = {}, strictAttributeCase) {
    const objectToCheckValue = this.getObjectValue(objectToCheck, this.attribute, strictAttributeCase);
    return typeof objectToCheckValue !== "undefined";
  }
  toString() {
    return `(${this.escape(this.attribute)}=*)`;
  }
}

var __defProp$q = Object.defineProperty;
var __defNormalProp$q = (obj, key, value) => key in obj ? __defProp$q(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$q = (obj, key, value) => {
  __defNormalProp$q(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SubstringFilter extends Filter {
  constructor(options = {}) {
    super();
    __publicField$q(this, "type", SearchFilter.substrings);
    __publicField$q(this, "attribute");
    __publicField$q(this, "initial");
    __publicField$q(this, "any");
    __publicField$q(this, "final");
    this.attribute = options.attribute ?? "";
    this.initial = options.initial ?? "";
    this.any = options.any ?? [];
    this.final = options.final ?? "";
  }
  parseFilter(reader) {
    this.attribute = reader.readString()?.toLowerCase() ?? "";
    reader.readSequence();
    const end = reader.offset + reader.length;
    while (reader.offset < end) {
      const tag = reader.peek();
      switch (tag) {
        case 128:
          this.initial = reader.readString(tag) ?? "";
          if (this.attribute === "objectclass") {
            this.initial = this.initial.toLowerCase();
          }
          break;
        case 129: {
          let anyValue = reader.readString(tag) ?? "";
          if (this.attribute === "objectclass") {
            anyValue = anyValue.toLowerCase();
          }
          this.any.push(anyValue);
          break;
        }
        case 130:
          this.final = reader.readString(tag) ?? "";
          if (this.attribute === "objectclass") {
            this.final = this.final.toLowerCase();
          }
          break;
        default: {
          let type = "<null>";
          if (tag) {
            type = `0x${tag.toString(16)}`;
          }
          throw new Error(`Invalid substring filter type: ${type}`);
        }
      }
    }
  }
  writeFilter(writer) {
    writer.writeString(this.attribute);
    writer.startSequence();
    if (this.initial) {
      writer.writeString(this.initial, 128);
    }
    for (const anyItem of this.any) {
      writer.writeString(anyItem, 129);
    }
    if (this.final) {
      writer.writeString(this.final, 130);
    }
    writer.endSequence();
  }
  matches(objectToCheck = {}, strictAttributeCase) {
    const objectToCheckValue = this.getObjectValue(objectToCheck, this.attribute, strictAttributeCase);
    if (typeof objectToCheckValue !== "undefined") {
      let regexp = "";
      if (this.initial) {
        regexp += `^${SubstringFilter._escapeRegExp(this.initial)}.*`;
      }
      for (const anyItem of this.any) {
        regexp += `${SubstringFilter._escapeRegExp(anyItem)}.*`;
      }
      if (this.final) {
        regexp += `${SubstringFilter._escapeRegExp(this.final)}$`;
      }
      const matcher = new RegExp(regexp, strictAttributeCase ? "gmu" : "igmu");
      return matcher.test(objectToCheckValue);
    }
    return false;
  }
  toString() {
    let result = `(${this.escape(this.attribute)}=${this.escape(this.initial)}*`;
    for (const anyItem of this.any) {
      result += `${this.escape(anyItem)}*`;
    }
    result += `${this.escape(this.final)})`;
    return result;
  }
  static _escapeRegExp(str) {
    return str.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
  }
}

const ProtocolOperation = {
  // Misc
  LDAP_VERSION_3: 3,
  LBER_SET: 49,
  LDAP_CONTROLS: 160,
  // Requests
  LDAP_REQ_BIND: 96,
  LDAP_REQ_BIND_SASL: 163,
  LDAP_REQ_UNBIND: 66,
  LDAP_REQ_SEARCH: 99,
  LDAP_REQ_MODIFY: 102,
  LDAP_REQ_ADD: 104,
  LDAP_REQ_DELETE: 74,
  LDAP_REQ_MODRDN: 108,
  LDAP_REQ_COMPARE: 110,
  LDAP_REQ_ABANDON: 80,
  LDAP_REQ_EXTENSION: 119,
  // Responses
  LDAP_RES_BIND: 97,
  LDAP_RES_SEARCH_ENTRY: 100,
  LDAP_RES_SEARCH_REF: 115,
  LDAP_RES_SEARCH: 101,
  LDAP_RES_MODIFY: 103,
  LDAP_RES_ADD: 105,
  LDAP_RES_DELETE: 107,
  LDAP_RES_MODRDN: 109,
  LDAP_RES_COMPARE: 111,
  LDAP_RES_EXTENSION: 120
};

const { Ber: Ber$2, BerReader: BerReader$1 } = asn1__default;
class ControlParser {
  static parse(reader, requestControls) {
    if (reader.readSequence() === null) {
      return null;
    }
    let type = "";
    let critical = false;
    let value = Buffer.alloc(0);
    if (reader.length) {
      const end = reader.offset + reader.length;
      type = reader.readString() ?? "";
      if (reader.offset < end) {
        if (reader.peek() === Ber$2.Boolean) {
          critical = reader.readBoolean() ?? false;
        }
      }
      if (reader.offset < end) {
        value = reader.readString(Ber$2.OctetString, true) ?? Buffer.alloc(0);
      }
    }
    let control;
    switch (type) {
      case EntryChangeNotificationControl.type:
        control = new EntryChangeNotificationControl({
          critical
        });
        break;
      case PagedResultsControl.type:
        control = new PagedResultsControl({
          critical
        });
        break;
      case PersistentSearchControl.type:
        control = new PersistentSearchControl({
          critical
        });
        break;
      case ServerSideSortingRequestControl.type:
        control = new ServerSideSortingRequestControl({
          critical
        });
        break;
      default:
        control = requestControls.find((requestControl) => requestControl.type === type);
        break;
    }
    if (!control) {
      return null;
    }
    const controlReader = new BerReader$1(value);
    control.parse(controlReader);
    return control;
  }
}

var __defProp$p = Object.defineProperty;
var __defNormalProp$p = (obj, key, value) => key in obj ? __defProp$p(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$p = (obj, key, value) => {
  __defNormalProp$p(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const { BerWriter } = asn1__default;
class Message {
  constructor(options) {
    __publicField$p(this, "version", ProtocolOperation.LDAP_VERSION_3);
    __publicField$p(this, "messageId", 0);
    __publicField$p(this, "controls");
    this.messageId = options.messageId;
    this.controls = options.controls;
  }
  write() {
    const writer = new BerWriter();
    writer.startSequence();
    writer.writeInt(this.messageId);
    writer.startSequence(this.protocolOperation);
    this.writeMessage(writer);
    writer.endSequence();
    if (this.controls?.length) {
      writer.startSequence(ProtocolOperation.LDAP_CONTROLS);
      for (const control of this.controls) {
        control.write(writer);
      }
      writer.endSequence();
    }
    writer.endSequence();
    return writer.buffer;
  }
  parse(reader, requestControls) {
    this.controls = [];
    this.parseMessage(reader);
    if (reader.peek() === ProtocolOperation.LDAP_CONTROLS) {
      reader.readSequence();
      const end = reader.offset + reader.length;
      while (reader.offset < end) {
        const control = ControlParser.parse(reader, requestControls);
        if (control) {
          this.controls.push(control);
        }
      }
    }
  }
  toString() {
    return JSON.stringify(
      {
        messageId: this.messageId,
        messageType: this.constructor.name
      },
      null,
      2
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parseMessage(_) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  writeMessage(_) {
  }
}

var __defProp$o = Object.defineProperty;
var __defNormalProp$o = (obj, key, value) => key in obj ? __defProp$o(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$o = (obj, key, value) => {
  __defNormalProp$o(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AbandonRequest extends Message {
  constructor(options) {
    super(options);
    __publicField$o(this, "protocolOperation");
    __publicField$o(this, "abandonId");
    this.protocolOperation = ProtocolOperation.LDAP_REQ_ABANDON;
    this.abandonId = options.abandonId ?? 0;
  }
  /* eslint-disable no-bitwise */
  writeMessage(writer) {
    let i = this.abandonId;
    let intSize = 4;
    const mask = 4286578688;
    while (((i & mask) === 0 || (i & mask) === mask) && intSize > 1) {
      intSize -= 1;
      i <<= 8;
    }
    assert__namespace.ok(intSize <= 4);
    while (intSize-- > 0) {
      writer.writeByte((i & 4278190080) >> 24);
      i <<= 8;
    }
  }
  parseMessage(reader) {
    const { length } = reader;
    if (length) {
      let offset = 1;
      let value;
      const fb = reader.buffer[offset] ?? 0;
      value = fb & 127;
      for (let i = 1; i < length; i += 1) {
        value <<= 8;
        offset += 1;
        const bufferValue = reader.buffer[offset] ?? 0;
        value |= bufferValue & 255;
      }
      if ((fb & 128) === 128) {
        value = -value;
      }
      reader._offset += length;
      this.abandonId = value;
    } else {
      this.abandonId = 0;
    }
  }
  /* eslint-enable no-bitwise */
}

var __defProp$n = Object.defineProperty;
var __defNormalProp$n = (obj, key, value) => key in obj ? __defProp$n(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$n = (obj, key, value) => {
  __defNormalProp$n(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const { Ber: Ber$1 } = asn1__default;
class Attribute {
  constructor(options = {}) {
    __publicField$n(this, "buffers", []);
    __publicField$n(this, "type");
    __publicField$n(this, "values");
    this.type = options.type ?? "";
    this.values = options.values ?? [];
  }
  get parsedBuffers() {
    return this.buffers;
  }
  write(writer) {
    writer.startSequence();
    const { type } = this;
    writer.writeString(type);
    writer.startSequence(ProtocolOperation.LBER_SET);
    if (this.values.length) {
      for (const value of this.values) {
        if (Buffer.isBuffer(value)) {
          writer.writeBuffer(value, Ber$1.OctetString);
        } else {
          writer.writeString(value);
        }
      }
    } else {
      writer.writeStringArray([]);
    }
    writer.endSequence();
    writer.endSequence();
  }
  parse(reader) {
    reader.readSequence();
    this.type = reader.readString() ?? "";
    const isBinaryType = this._isBinaryType();
    if (reader.peek() === ProtocolOperation.LBER_SET) {
      if (reader.readSequence(ProtocolOperation.LBER_SET)) {
        const end = reader.offset + reader.length;
        while (reader.offset < end) {
          const buffer = reader.readString(Ber$1.OctetString, true) ?? Buffer.alloc(0);
          this.buffers.push(buffer);
          if (isBinaryType) {
            this.values.push(buffer);
          } else {
            this.values.push(buffer.toString("utf8"));
          }
        }
      }
    }
  }
  _isBinaryType() {
    return /;binary$/i.test(this.type || "");
  }
}

var __defProp$m = Object.defineProperty;
var __defNormalProp$m = (obj, key, value) => key in obj ? __defProp$m(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$m = (obj, key, value) => {
  __defNormalProp$m(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AddRequest extends Message {
  constructor(options) {
    super(options);
    __publicField$m(this, "protocolOperation");
    __publicField$m(this, "dn");
    __publicField$m(this, "attributes");
    this.protocolOperation = ProtocolOperation.LDAP_REQ_ADD;
    this.dn = options.dn;
    this.attributes = options.attributes ?? [];
  }
  writeMessage(writer) {
    writer.writeString(this.dn);
    writer.startSequence();
    for (const attribute of this.attributes) {
      attribute.write(writer);
    }
    writer.endSequence();
  }
  parseMessage(reader) {
    this.dn = reader.readString() ?? "";
    reader.readSequence();
    const end = reader.offset + reader.length;
    while (reader.offset < end) {
      const attribute = new Attribute();
      attribute.parse(reader);
      this.attributes.push(attribute);
    }
  }
}

var __defProp$l = Object.defineProperty;
var __defNormalProp$l = (obj, key, value) => key in obj ? __defProp$l(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$l = (obj, key, value) => {
  __defNormalProp$l(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class MessageResponse extends Message {
  constructor(options) {
    super(options);
    __publicField$l(this, "status");
    __publicField$l(this, "matchedDN");
    __publicField$l(this, "errorMessage");
    this.status = options.status ?? 0;
    this.matchedDN = options.matchedDN ?? "";
    this.errorMessage = options.errorMessage ?? "";
  }
  parseMessage(reader) {
    this.status = reader.readEnumeration() ?? 0;
    this.matchedDN = reader.readString() ?? "";
    this.errorMessage = reader.readString() ?? "";
  }
}

var __defProp$k = Object.defineProperty;
var __defNormalProp$k = (obj, key, value) => key in obj ? __defProp$k(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$k = (obj, key, value) => {
  __defNormalProp$k(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AddResponse extends MessageResponse {
  constructor(options) {
    super(options);
    __publicField$k(this, "protocolOperation");
    this.protocolOperation = ProtocolOperation.LDAP_RES_ADD;
  }
}

var __defProp$j = Object.defineProperty;
var __defNormalProp$j = (obj, key, value) => key in obj ? __defProp$j(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$j = (obj, key, value) => {
  __defNormalProp$j(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const { Ber } = asn1__default;
const SASL_MECHANISMS = ["EXTERNAL", "PLAIN", "DIGEST-MD5", "SCRAM-SHA-1"];
class BindRequest extends Message {
  constructor(options) {
    super(options);
    __publicField$j(this, "protocolOperation");
    __publicField$j(this, "dn");
    __publicField$j(this, "password");
    __publicField$j(this, "mechanism");
    this.protocolOperation = ProtocolOperation.LDAP_REQ_BIND;
    this.dn = options.dn ?? "";
    this.password = options.password ?? "";
    this.mechanism = options.mechanism;
  }
  writeMessage(writer) {
    writer.writeInt(this.version);
    writer.writeString(this.dn);
    if (this.mechanism) {
      writer.startSequence(ProtocolOperation.LDAP_REQ_BIND_SASL);
      writer.writeString(this.mechanism);
      writer.writeString(this.password);
      writer.endSequence();
    } else {
      writer.writeString(this.password, Ber.Context);
    }
  }
  parseMessage(reader) {
    this.version = reader.readInt() ?? ProtocolOperation.LDAP_VERSION_3;
    this.dn = reader.readString() ?? "";
    const contextCheck = reader.peek();
    if (contextCheck !== Ber.Context) {
      let type = "<null>";
      if (contextCheck) {
        type = `0x${contextCheck.toString(16)}`;
      }
      throw new Error(`Authentication type not supported: ${type}`);
    }
    this.password = reader.readString(Ber.Context) ?? "";
  }
}

var __defProp$i = Object.defineProperty;
var __defNormalProp$i = (obj, key, value) => key in obj ? __defProp$i(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$i = (obj, key, value) => {
  __defNormalProp$i(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class BindResponse extends MessageResponse {
  constructor(options) {
    super(options);
    __publicField$i(this, "protocolOperation");
    __publicField$i(this, "data", []);
    this.protocolOperation = ProtocolOperation.LDAP_RES_BIND;
  }
  parseMessage(reader) {
    super.parseMessage(reader);
    while (reader.remain > 0) {
      const type = reader.peek();
      if (type === ProtocolOperation.LDAP_CONTROLS) {
        break;
      }
      this.data.push(reader.readString(typeof type === "number" ? type : void 0) ?? "");
    }
  }
}

var __defProp$h = Object.defineProperty;
var __defNormalProp$h = (obj, key, value) => key in obj ? __defProp$h(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$h = (obj, key, value) => {
  __defNormalProp$h(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class CompareRequest extends Message {
  constructor(options) {
    super(options);
    __publicField$h(this, "protocolOperation");
    __publicField$h(this, "dn");
    __publicField$h(this, "attribute");
    __publicField$h(this, "value");
    this.protocolOperation = ProtocolOperation.LDAP_REQ_COMPARE;
    this.attribute = options.attribute ?? "";
    this.value = options.value ?? "";
    this.dn = options.dn ?? "";
  }
  writeMessage(writer) {
    writer.writeString(this.dn);
    writer.startSequence();
    writer.writeString(this.attribute);
    writer.writeString(this.value);
    writer.endSequence();
  }
  parseMessage(reader) {
    this.dn = reader.readString() ?? "";
    reader.readSequence();
    this.attribute = (reader.readString() ?? "").toLowerCase();
    this.value = reader.readString() ?? "";
  }
}

var __defProp$g = Object.defineProperty;
var __defNormalProp$g = (obj, key, value) => key in obj ? __defProp$g(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$g = (obj, key, value) => {
  __defNormalProp$g(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var CompareResult = /* @__PURE__ */ ((CompareResult2) => {
  CompareResult2[CompareResult2["compareTrue"] = 6] = "compareTrue";
  CompareResult2[CompareResult2["compareFalse"] = 5] = "compareFalse";
  CompareResult2[CompareResult2["noSuchAttribute"] = 22] = "noSuchAttribute";
  CompareResult2[CompareResult2["noSuchObject"] = 50] = "noSuchObject";
  return CompareResult2;
})(CompareResult || {});
class CompareResponse extends MessageResponse {
  constructor(options) {
    super(options);
    __publicField$g(this, "protocolOperation");
    this.protocolOperation = ProtocolOperation.LDAP_RES_COMPARE;
  }
}

var __defProp$f = Object.defineProperty;
var __defNormalProp$f = (obj, key, value) => key in obj ? __defProp$f(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$f = (obj, key, value) => {
  __defNormalProp$f(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DeleteRequest extends Message {
  constructor(options) {
    super(options);
    __publicField$f(this, "protocolOperation");
    __publicField$f(this, "dn");
    this.protocolOperation = ProtocolOperation.LDAP_REQ_DELETE;
    this.dn = options.dn ?? "";
  }
  writeMessage(writer) {
    const buffer = Buffer.from(this.dn);
    for (const byte of buffer) {
      writer.writeByte(byte);
    }
  }
  parseMessage(reader) {
    const { length } = reader;
    this.dn = reader.buffer.slice(0, length).toString("utf8");
    reader._offset += reader.length;
  }
}

var __defProp$e = Object.defineProperty;
var __defNormalProp$e = (obj, key, value) => key in obj ? __defProp$e(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$e = (obj, key, value) => {
  __defNormalProp$e(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DeleteResponse extends MessageResponse {
  constructor(options) {
    super(options);
    __publicField$e(this, "protocolOperation");
    this.protocolOperation = ProtocolOperation.LDAP_RES_DELETE;
  }
}

var __defProp$d = Object.defineProperty;
var __defNormalProp$d = (obj, key, value) => key in obj ? __defProp$d(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$d = (obj, key, value) => {
  __defNormalProp$d(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ExtendedRequest extends Message {
  constructor(options) {
    super(options);
    __publicField$d(this, "protocolOperation");
    __publicField$d(this, "oid");
    __publicField$d(this, "value");
    this.protocolOperation = ProtocolOperation.LDAP_REQ_EXTENSION;
    this.oid = options.oid ?? "";
    this.value = options.value ?? "";
  }
  writeMessage(writer) {
    writer.writeString(this.oid, 128);
    if (Buffer.isBuffer(this.value)) {
      writer.writeBuffer(this.value, 129);
    } else if (this.value) {
      writer.writeString(this.value, 129);
    }
  }
  parseMessage(reader) {
    this.oid = reader.readString(128) ?? "";
    if (reader.peek() === 129) {
      try {
        this.value = reader.readString(129) ?? "";
      } catch (ex) {
        this.value = reader.readString(129, true) ?? Buffer.alloc(0);
      }
    }
  }
}

var __defProp$c = Object.defineProperty;
var __defNormalProp$c = (obj, key, value) => key in obj ? __defProp$c(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$c = (obj, key, value) => {
  __defNormalProp$c(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const ExtendedResponseProtocolOperations = {
  oid: 138,
  value: 139
};
class ExtendedResponse extends MessageResponse {
  constructor(options) {
    super(options);
    __publicField$c(this, "protocolOperation");
    __publicField$c(this, "oid");
    __publicField$c(this, "value");
    this.protocolOperation = ProtocolOperation.LDAP_RES_EXTENSION;
    this.oid = options.oid;
    this.value = options.value;
  }
  parseMessage(reader) {
    super.parseMessage(reader);
    if (reader.peek() === ExtendedResponseProtocolOperations.oid) {
      this.oid = reader.readString(ExtendedResponseProtocolOperations.oid) ?? "";
    }
    if (reader.peek() === ExtendedResponseProtocolOperations.value) {
      this.value = reader.readString(ExtendedResponseProtocolOperations.value) ?? void 0;
    }
  }
}

var __defProp$b = Object.defineProperty;
var __defNormalProp$b = (obj, key, value) => key in obj ? __defProp$b(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$b = (obj, key, value) => {
  __defNormalProp$b(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ModifyDNRequest extends Message {
  constructor(options) {
    super(options);
    __publicField$b(this, "protocolOperation");
    __publicField$b(this, "deleteOldRdn");
    __publicField$b(this, "dn");
    __publicField$b(this, "newRdn");
    __publicField$b(this, "newSuperior");
    this.protocolOperation = ProtocolOperation.LDAP_REQ_MODRDN;
    this.deleteOldRdn = options.deleteOldRdn !== false;
    this.dn = options.dn ?? "";
    this.newRdn = options.newRdn ?? "";
    this.newSuperior = options.newSuperior ?? "";
  }
  writeMessage(writer) {
    writer.writeString(this.dn);
    writer.writeString(this.newRdn);
    writer.writeBoolean(this.deleteOldRdn);
    if (this.newSuperior) {
      const length = Buffer.byteLength(this.newSuperior);
      writer.writeByte(128);
      writer.writeByte(length);
      writer._ensure(length);
      writer._buf.write(this.newSuperior, writer._offset);
      writer._offset += length;
    }
  }
  parseMessage(reader) {
    this.dn = reader.readString() ?? "";
    this.newRdn = reader.readString() ?? "";
    this.deleteOldRdn = reader.readBoolean() ?? false;
    if (reader.peek() === 128) {
      this.newSuperior = reader.readString(128) ?? "";
    }
  }
}

var __defProp$a = Object.defineProperty;
var __defNormalProp$a = (obj, key, value) => key in obj ? __defProp$a(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$a = (obj, key, value) => {
  __defNormalProp$a(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ModifyDNResponse extends MessageResponse {
  constructor(options) {
    super(options);
    __publicField$a(this, "protocolOperation");
    this.protocolOperation = ProtocolOperation.LDAP_RES_MODRDN;
  }
}

var __defProp$9 = Object.defineProperty;
var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$9 = (obj, key, value) => {
  __defNormalProp$9(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Change {
  constructor(options = {
    modification: new Attribute()
  }) {
    __publicField$9(this, "operation");
    __publicField$9(this, "modification");
    this.operation = options.operation ?? "add";
    this.modification = options.modification;
  }
  write(writer) {
    writer.startSequence();
    switch (this.operation) {
      case "add":
        writer.writeEnumeration(0);
        break;
      case "delete":
        writer.writeEnumeration(1);
        break;
      case "replace":
        writer.writeEnumeration(2);
        break;
      default:
        throw new Error(`Unknown change operation: ${this.operation}`);
    }
    this.modification.write(writer);
    writer.endSequence();
  }
  parse(reader) {
    reader.readSequence();
    const operation = reader.readEnumeration();
    switch (operation) {
      case 0:
        this.operation = "add";
        break;
      case 1:
        this.operation = "delete";
        break;
      case 2:
        this.operation = "replace";
        break;
      case null:
        throw new Error(`Unknown change operation - <null> operation value`);
      default:
        throw new Error(`Unknown change operation: 0x${operation.toString(16)}`);
    }
    this.modification = new Attribute();
    this.modification.parse(reader);
  }
}

var __defProp$8 = Object.defineProperty;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$8 = (obj, key, value) => {
  __defNormalProp$8(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ModifyRequest extends Message {
  constructor(options) {
    super(options);
    __publicField$8(this, "protocolOperation");
    __publicField$8(this, "dn");
    __publicField$8(this, "changes");
    this.protocolOperation = ProtocolOperation.LDAP_REQ_MODIFY;
    this.dn = options.dn ?? "";
    this.changes = options.changes ?? [];
  }
  writeMessage(writer) {
    writer.writeString(this.dn);
    writer.startSequence();
    for (const change of this.changes) {
      change.write(writer);
    }
    writer.endSequence();
  }
  parseMessage(reader) {
    this.dn = reader.readString() ?? "";
    reader.readSequence();
    const end = reader.offset + reader.length;
    while (reader.offset < end) {
      const change = new Change();
      change.parse(reader);
      this.changes.push(change);
    }
  }
}

var __defProp$7 = Object.defineProperty;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$7 = (obj, key, value) => {
  __defNormalProp$7(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ModifyResponse extends MessageResponse {
  constructor(options) {
    super(options);
    __publicField$7(this, "protocolOperation");
    this.protocolOperation = ProtocolOperation.LDAP_RES_MODIFY;
  }
}

var __defProp$6 = Object.defineProperty;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$6 = (obj, key, value) => {
  __defNormalProp$6(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SearchEntry extends MessageResponse {
  constructor(options) {
    super(options);
    __publicField$6(this, "protocolOperation");
    __publicField$6(this, "name");
    __publicField$6(this, "attributes");
    this.protocolOperation = ProtocolOperation.LDAP_RES_SEARCH_ENTRY;
    this.name = options.name ?? "";
    this.attributes = options.attributes ?? [];
  }
  parseMessage(reader) {
    this.name = reader.readString() ?? "";
    reader.readSequence();
    const end = reader.offset + reader.length;
    while (reader.offset < end) {
      const attribute = new Attribute();
      attribute.parse(reader);
      this.attributes.push(attribute);
    }
  }
  toObject(requestAttributes, explicitBufferAttributes) {
    const result = {
      dn: this.name
    };
    const hasExplicitBufferAttributes = explicitBufferAttributes.length;
    for (const attribute of this.attributes) {
      let { values } = attribute;
      if (hasExplicitBufferAttributes && explicitBufferAttributes.includes(attribute.type)) {
        values = attribute.parsedBuffers;
      }
      if (values.length) {
        if (values.length === 1) {
          result[attribute.type] = values[0] ?? [];
        } else {
          result[attribute.type] = values;
        }
      } else {
        result[attribute.type] = [];
      }
    }
    for (const attribute of requestAttributes) {
      if (typeof result[attribute] === "undefined") {
        result[attribute] = [];
      }
    }
    return result;
  }
}

var __defProp$5 = Object.defineProperty;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$5 = (obj, key, value) => {
  __defNormalProp$5(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SearchReference extends MessageResponse {
  constructor(options) {
    super(options);
    __publicField$5(this, "protocolOperation");
    __publicField$5(this, "uris");
    this.protocolOperation = ProtocolOperation.LDAP_RES_SEARCH_REF;
    this.uris = options.uris ?? [];
  }
  parseMessage(reader) {
    const end = reader.offset + reader.length;
    while (reader.offset < end) {
      const url = reader.readString() ?? "";
      this.uris.push(url);
    }
  }
}

class FilterParser {
  static parseString(filterString) {
    if (!filterString) {
      throw new Error("Filter cannot be empty");
    }
    if (!filterString.startsWith("(")) {
      filterString = `(${filterString})`;
    }
    const parseResult = FilterParser._parseString(filterString, 0, filterString);
    const end = filterString.length - 1;
    if (parseResult.end < end) {
      throw new Error(`Unbalanced parens in filter string: ${filterString}`);
    }
    return parseResult.filter;
  }
  /*
   * A filter looks like this coming in:
   *      Filter ::= CHOICE {
   *              and             [0]     SET OF Filter,
   *              or              [1]     SET OF Filter,
   *              not             [2]     Filter,
   *              equalityMatch   [3]     AttributeValueAssertion,
   *              substrings      [4]     SubstringFilter,
   *              greaterOrEqual  [5]     AttributeValueAssertion,
   *              lessOrEqual     [6]     AttributeValueAssertion,
   *              present         [7]     AttributeType,
   *              approxMatch     [8]     AttributeValueAssertion,
   *              extensibleMatch [9]     MatchingRuleAssertion --v3 only
   *      }
   *
   *      SubstringFilter ::= SEQUENCE {
   *              type               AttributeType,
   *              SEQUENCE OF CHOICE {
   *                      initial          [0] IA5String,
   *                      any              [1] IA5String,
   *                      final            [2] IA5String
   *              }
   *      }
   *
   * The extensibleMatch was added in LDAPv3:
   *
   *      MatchingRuleAssertion ::= SEQUENCE {
   *              matchingRule    [1] MatchingRuleID OPTIONAL,
   *              type            [2] AttributeDescription OPTIONAL,
   *              matchValue      [3] AssertionValue,
   *              dnAttributes    [4] BOOLEAN DEFAULT FALSE
   *      }
   */
  static parse(reader) {
    const type = reader.readSequence();
    let filter;
    switch (type) {
      case SearchFilter.and: {
        const andFilters = FilterParser._parseSet(reader);
        filter = new AndFilter({
          filters: andFilters
        });
        break;
      }
      case SearchFilter.approxMatch:
        filter = new ApproximateFilter();
        filter.parse(reader);
        break;
      case SearchFilter.equalityMatch:
        filter = new EqualityFilter();
        filter.parse(reader);
        break;
      case SearchFilter.extensibleMatch:
        filter = new ExtensibleFilter();
        filter.parse(reader);
        break;
      case SearchFilter.greaterOrEqual:
        filter = new GreaterThanEqualsFilter();
        filter.parse(reader);
        break;
      case SearchFilter.lessOrEqual:
        filter = new LessThanEqualsFilter();
        filter.parse(reader);
        break;
      case SearchFilter.not: {
        const innerFilter = FilterParser.parse(reader);
        filter = new NotFilter({
          filter: innerFilter
        });
        break;
      }
      case SearchFilter.or: {
        const orFilters = FilterParser._parseSet(reader);
        filter = new OrFilter({
          filters: orFilters
        });
        break;
      }
      case SearchFilter.present:
        filter = new PresenceFilter();
        filter.parse(reader);
        break;
      case SearchFilter.substrings:
        filter = new SubstringFilter();
        filter.parse(reader);
        break;
      default:
        throw new Error(`Invalid search filter type: 0x${type ?? "<null>"}`);
    }
    return filter;
  }
  static _parseString(filterString, start, fullString) {
    let cursor = start;
    const { length } = filterString;
    let filter;
    if (filterString[cursor] !== "(") {
      throw new Error(`Missing paren: ${filterString}. Full string: ${fullString}`);
    }
    cursor += 1;
    switch (filterString[cursor]) {
      case "&": {
        cursor += 1;
        const children = [];
        do {
          const childResult = FilterParser._parseString(filterString, cursor, fullString);
          children.push(childResult.filter);
          cursor = childResult.end + 1;
        } while (cursor < length && filterString[cursor] !== ")");
        filter = new AndFilter({
          filters: children
        });
        break;
      }
      case "|": {
        cursor += 1;
        const children = [];
        do {
          const childResult = FilterParser._parseString(filterString, cursor, fullString);
          children.push(childResult.filter);
          cursor = childResult.end + 1;
        } while (cursor < length && filterString[cursor] !== ")");
        filter = new OrFilter({
          filters: children
        });
        break;
      }
      case "!": {
        const childResult = FilterParser._parseString(filterString, cursor + 1, fullString);
        filter = new NotFilter({
          filter: childResult.filter
        });
        cursor = childResult.end + 1;
        break;
      }
      default: {
        const end = filterString.indexOf(")", cursor);
        if (end === -1) {
          throw new Error(`Unbalanced parens: ${filterString}. Full string: ${fullString}`);
        }
        filter = FilterParser._parseExpressionFilterFromString(filterString.substr(cursor, end - cursor));
        cursor = end;
      }
    }
    return {
      end: cursor,
      filter
    };
  }
  static _parseExpressionFilterFromString(filterString) {
    let attribute;
    let remainingExpression;
    if (filterString.startsWith(":")) {
      attribute = "";
      remainingExpression = filterString;
    } else {
      const matches = /^[-\w]+/.exec(filterString);
      if (matches?.length) {
        [attribute] = matches;
        remainingExpression = filterString.substr(attribute.length);
      } else {
        throw new Error(`Invalid attribute name: ${filterString}`);
      }
    }
    if (remainingExpression === "=*") {
      return new PresenceFilter({
        attribute
      });
    }
    if (remainingExpression.startsWith("=")) {
      remainingExpression = remainingExpression.substr(1);
      if (remainingExpression.includes("*")) {
        const escapedExpression = FilterParser._unescapeSubstring(remainingExpression);
        return new SubstringFilter({
          attribute,
          initial: escapedExpression.initial,
          any: escapedExpression.any,
          final: escapedExpression.final
        });
      }
      return new EqualityFilter({
        attribute,
        value: FilterParser._unescapeHexValues(remainingExpression)
      });
    }
    if (remainingExpression.startsWith(">") && remainingExpression[1] === "=") {
      return new GreaterThanEqualsFilter({
        attribute,
        value: FilterParser._unescapeHexValues(remainingExpression.substr(2))
      });
    }
    if (remainingExpression.startsWith("<") && remainingExpression[1] === "=") {
      return new LessThanEqualsFilter({
        attribute,
        value: FilterParser._unescapeHexValues(remainingExpression.substr(2))
      });
    }
    if (remainingExpression.startsWith("~") && remainingExpression[1] === "=") {
      return new ApproximateFilter({
        attribute,
        value: FilterParser._unescapeHexValues(remainingExpression.substr(2))
      });
    }
    if (remainingExpression.startsWith(":")) {
      return FilterParser._parseExtensibleFilterFromString(attribute, remainingExpression);
    }
    throw new Error(`Invalid expression: ${filterString}`);
  }
  static _parseExtensibleFilterFromString(attribute, filterString) {
    let dnAttributes = false;
    let rule;
    const fields = filterString.split(":");
    if (fields.length <= 1) {
      throw new Error(`Invalid extensible filter: ${filterString}`);
    }
    fields.shift();
    if (fields[0]?.toLowerCase() === "dn") {
      dnAttributes = true;
      fields.shift();
    }
    if (fields.length && !fields[0]?.startsWith("=")) {
      rule = fields.shift();
    }
    if (fields.length && !fields[0]?.startsWith("=")) {
      throw new Error(`Missing := in extensible filter: ${filterString}`);
    }
    const remainingExpression = fields.join(":").substr(1);
    const options = {
      matchType: attribute,
      dnAttributes,
      rule,
      value: FilterParser._unescapeHexValues(remainingExpression)
    };
    return new ExtensibleFilter(options);
  }
  static _unescapeHexValues(input) {
    let index = 0;
    const end = input.length;
    let result = "";
    while (index < end) {
      const char = input[index];
      switch (char) {
        case "(":
          throw new Error(`Illegal unescaped character: ${char} in value: ${input}`);
        case "\\": {
          const value = input.substr(index + 1, 2);
          if (/^[a-fA-F0-9]{2}$/.exec(value) === null) {
            throw new Error(`Invalid escaped hex character: ${value} in value: ${input}`);
          }
          result += String.fromCharCode(Number.parseInt(value, 16));
          index += 3;
          break;
        }
        default:
          if (char) {
            result += char;
          }
          index += 1;
          break;
      }
    }
    return result;
  }
  static _unescapeSubstring(input) {
    const fields = input.split("*");
    if (fields.length < 2) {
      throw new Error(`Wildcard missing: ${input}`);
    }
    return {
      initial: FilterParser._unescapeHexValues(fields.shift() ?? ""),
      final: FilterParser._unescapeHexValues(fields.pop() ?? ""),
      any: fields.map((field) => FilterParser._unescapeHexValues(field))
    };
  }
  static _parseSet(reader) {
    const filters = [];
    const end = reader.offset + reader.length;
    while (reader.offset < end) {
      filters.push(FilterParser.parse(reader));
    }
    return filters;
  }
}

var __defProp$4 = Object.defineProperty;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$4 = (obj, key, value) => {
  __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SearchRequest extends Message {
  constructor(options) {
    super(options);
    __publicField$4(this, "protocolOperation");
    __publicField$4(this, "baseDN");
    __publicField$4(this, "scope");
    __publicField$4(this, "derefAliases");
    __publicField$4(this, "sizeLimit");
    __publicField$4(this, "timeLimit");
    __publicField$4(this, "returnAttributeValues");
    __publicField$4(this, "filter");
    __publicField$4(this, "attributes");
    __publicField$4(this, "explicitBufferAttributes");
    this.protocolOperation = ProtocolOperation.LDAP_REQ_SEARCH;
    this.baseDN = options.baseDN ?? "";
    this.scope = options.scope ?? "sub";
    this.derefAliases = options.derefAliases ?? "never";
    this.sizeLimit = options.sizeLimit ?? 0;
    this.timeLimit = options.timeLimit ?? 10;
    this.returnAttributeValues = options.returnAttributeValues !== false;
    this.filter = options.filter;
    this.attributes = options.attributes ?? [];
    this.explicitBufferAttributes = options.explicitBufferAttributes ?? [];
  }
  writeMessage(writer) {
    writer.writeString(this.baseDN);
    switch (this.scope) {
      case "base":
        writer.writeEnumeration(0);
        break;
      case "one":
        writer.writeEnumeration(1);
        break;
      case "sub":
        writer.writeEnumeration(2);
        break;
      case "children":
        writer.writeEnumeration(3);
        break;
      default:
        throw new Error(`Invalid search scope: ${this.scope}`);
    }
    switch (this.derefAliases) {
      case "never":
        writer.writeEnumeration(0);
        break;
      case "search":
        writer.writeEnumeration(1);
        break;
      case "find":
        writer.writeEnumeration(2);
        break;
      case "always":
        writer.writeEnumeration(3);
        break;
      default:
        throw new Error(`Invalid deref alias: ${this.derefAliases}`);
    }
    writer.writeInt(this.sizeLimit);
    writer.writeInt(this.timeLimit);
    writer.writeBoolean(!this.returnAttributeValues);
    this.filter.write(writer);
    writer.startSequence();
    for (const attribute of this.attributes) {
      writer.writeString(attribute);
    }
    writer.endSequence();
  }
  parseMessage(reader) {
    this.baseDN = reader.readString() ?? "";
    const scope = reader.readEnumeration();
    switch (scope) {
      case 0:
        this.scope = "base";
        break;
      case 1:
        this.scope = "one";
        break;
      case 2:
        this.scope = "sub";
        break;
      case 3:
        this.scope = "children";
        break;
      default:
        throw new Error(`Invalid search scope: ${scope ?? "<null>"}`);
    }
    const derefAliases = reader.readEnumeration();
    switch (scope) {
      case 0:
        this.derefAliases = "never";
        break;
      case 1:
        this.derefAliases = "search";
        break;
      case 2:
        this.derefAliases = "find";
        break;
      case 3:
        this.derefAliases = "always";
        break;
      default:
        throw new Error(`Invalid deref alias: ${derefAliases ?? "<null>"}`);
    }
    this.sizeLimit = reader.readInt() ?? 0;
    this.timeLimit = reader.readInt() ?? 0;
    this.returnAttributeValues = !(reader.readBoolean() ?? false);
    this.filter = FilterParser.parse(reader);
    if (reader.peek() === 48) {
      reader.readSequence();
      const end = reader.offset + reader.length;
      while (reader.offset < end) {
        this.attributes.push((reader.readString() ?? "").toLowerCase());
      }
    }
  }
}

var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SearchResponse extends MessageResponse {
  constructor(options) {
    super(options);
    __publicField$3(this, "protocolOperation");
    __publicField$3(this, "searchEntries");
    __publicField$3(this, "searchReferences");
    this.protocolOperation = ProtocolOperation.LDAP_RES_SEARCH;
    this.searchEntries = options.searchEntries ?? [];
    this.searchReferences = options.searchReferences ?? [];
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class UnbindRequest extends Message {
  constructor(options) {
    super(options);
    __publicField$2(this, "protocolOperation");
    this.protocolOperation = ProtocolOperation.LDAP_REQ_UNBIND;
  }
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const { BerReader } = asn1__default;
class MessageParser extends events.EventEmitter {
  constructor() {
    super(...arguments);
    __publicField$1(this, "buffer");
  }
  read(data, messageDetailsByMessageId) {
    let nextMessage;
    if (this.buffer) {
      this.buffer = Buffer.concat([this.buffer, data]);
    } else {
      this.buffer = data;
    }
    const reader = new BerReader(this.buffer);
    let foundSequence = null;
    try {
      foundSequence = reader.readSequence();
    } catch (ex) {
      this.emit("error", ex);
    }
    if (!foundSequence || reader.remain < reader.length) {
      return;
    }
    if (reader.remain > reader.length) {
      nextMessage = this.buffer.slice(reader.offset + reader.length);
      reader._size = reader.offset + reader.length;
      assert__namespace.strictEqual(reader.remain, reader.length);
    }
    delete this.buffer;
    let messageId;
    let protocolOperation;
    try {
      messageId = reader.readInt();
      if (messageId == null) {
        throw new Error(`Unable to read message id`);
      }
      protocolOperation = reader.readSequence();
      if (protocolOperation == null) {
        throw new Error(`Unable to read protocol operation sequence for message: ${messageId}`);
      }
      const messageDetails = messageDetailsByMessageId.get(`${messageId}`);
      const message = this._getMessageFromProtocolOperation(messageId, protocolOperation, reader, messageDetails?.message);
      this.emit("message", message);
    } catch (ex) {
      if (messageId) {
        const errorWithMessageDetails = ex;
        errorWithMessageDetails.messageDetails = {
          messageId
        };
        if (protocolOperation) {
          errorWithMessageDetails.messageDetails.protocolOperation = protocolOperation;
        }
        this.emit("error", errorWithMessageDetails);
        return;
      }
      this.emit("error", ex);
      return;
    }
    if (nextMessage) {
      this.read(nextMessage, messageDetailsByMessageId);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  _getMessageFromProtocolOperation(messageId, protocolOperation, reader, messageDetails) {
    let message;
    switch (protocolOperation) {
      case ProtocolOperation.LDAP_RES_BIND:
        message = new BindResponse({
          messageId
        });
        break;
      case ProtocolOperation.LDAP_RES_ADD:
        message = new AddResponse({
          messageId
        });
        break;
      case ProtocolOperation.LDAP_RES_COMPARE:
        message = new CompareResponse({
          messageId
        });
        break;
      case ProtocolOperation.LDAP_RES_DELETE:
        message = new DeleteResponse({
          messageId
        });
        break;
      case ProtocolOperation.LDAP_RES_EXTENSION:
        message = new ExtendedResponse({
          messageId
        });
        break;
      case ProtocolOperation.LDAP_RES_MODRDN:
        message = new ModifyDNResponse({
          messageId
        });
        break;
      case ProtocolOperation.LDAP_RES_MODIFY:
        message = new ModifyResponse({
          messageId
        });
        break;
      case ProtocolOperation.LDAP_RES_SEARCH:
        message = new SearchResponse({
          messageId
        });
        break;
      case ProtocolOperation.LDAP_RES_SEARCH_ENTRY:
        message = new SearchEntry({
          messageId
        });
        break;
      case ProtocolOperation.LDAP_RES_SEARCH_REF:
        message = new SearchReference({
          messageId
        });
        break;
      default: {
        const error = new MessageParserError(`Protocol Operation not supported: 0x${protocolOperation.toString(16)}`);
        error.messageDetails = {
          messageId,
          protocolOperation
        };
        throw error;
      }
    }
    message.parse(reader, messageDetails?.controls ?? []);
    return message;
  }
}

const MessageResponseStatus = {
  Success: 0,
  SizeLimitExceeded: 4
};

class StatusCodeParser {
  static parse(result) {
    if (!result) {
      return new NoResultError();
    }
    switch (result.status) {
      case 1:
        return new OperationsError(result.errorMessage);
      case 2:
        return new ProtocolError(result.errorMessage);
      case 3:
        return new TimeLimitExceededError(result.errorMessage);
      case 4:
        return new SizeLimitExceededError(result.errorMessage);
      case 7:
        return new AuthMethodNotSupportedError(result.errorMessage);
      case 8:
        return new StrongAuthRequiredError(result.errorMessage);
      case 11:
        return new AdminLimitExceededError(result.errorMessage);
      case 12:
        return new UnavailableCriticalExtensionError(result.errorMessage);
      case 13:
        return new ConfidentialityRequiredError(result.errorMessage);
      case 14:
        return new SaslBindInProgressError(result);
      case 16:
        return new NoSuchAttributeError(result.errorMessage);
      case 17:
        return new UndefinedTypeError(result.errorMessage);
      case 18:
        return new InappropriateMatchingError(result.errorMessage);
      case 19:
        return new ConstraintViolationError(result.errorMessage);
      case 20:
        return new TypeOrValueExistsError(result.errorMessage);
      case 21:
        return new InvalidSyntaxError(result.errorMessage);
      case 32:
        return new NoSuchObjectError(result.errorMessage);
      case 33:
        return new AliasProblemError(result.errorMessage);
      case 34:
        return new InvalidDNSyntaxError(result.errorMessage);
      case 35:
        return new IsLeafError(result.errorMessage);
      case 36:
        return new AliasDerefProblemError(result.errorMessage);
      case 48:
        return new InappropriateAuthError(result.errorMessage);
      case 49:
        return new InvalidCredentialsError(result.errorMessage);
      case 50:
        return new InsufficientAccessError(result.errorMessage);
      case 51:
        return new BusyError(result.errorMessage);
      case 52:
        return new UnavailableError(result.errorMessage);
      case 53:
        return new UnwillingToPerformError(result.errorMessage);
      case 54:
        return new LoopDetectError(result.errorMessage);
      case 64:
        return new NamingViolationError(result.errorMessage);
      case 65:
        return new ObjectClassViolationError(result.errorMessage);
      case 66:
        return new NotAllowedOnNonLeafError(result.errorMessage);
      case 67:
        return new NotAllowedOnRDNError(result.errorMessage);
      case 68:
        return new AlreadyExistsError(result.errorMessage);
      case 69:
        return new NoObjectClassModsError(result.errorMessage);
      case 70:
        return new ResultsTooLargeError(result.errorMessage);
      case 71:
        return new AffectsMultipleDSAsError(result.errorMessage);
      case 112:
        return new TLSNotSupportedError(result.errorMessage);
      case 248:
        return new NoResultError(result.errorMessage);
      default:
        return new UnknownStatusCodeError(result.status, result.errorMessage);
    }
  }
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const MAX_MESSAGE_ID = 2 ** 31 - 1;
const logDebug = debug__default("ldapts");
class Client {
  constructor(options) {
    __publicField(this, "clientOptions");
    __publicField(this, "messageId", 1);
    __publicField(this, "host");
    __publicField(this, "port");
    __publicField(this, "secure");
    __publicField(this, "connected", false);
    __publicField(this, "socket");
    __publicField(this, "connectTimer");
    __publicField(this, "messageParser", new MessageParser());
    __publicField(this, "messageDetailsByMessageId", /* @__PURE__ */ new Map());
    __publicField(this, "socketDataHandler", (data) => {
      if (this.messageParser) {
        this.messageParser.read(data, this.messageDetailsByMessageId);
      }
    });
    this.clientOptions = options;
    if (!this.clientOptions.timeout) {
      this.clientOptions.timeout = 0;
    }
    if (!this.clientOptions.connectTimeout) {
      this.clientOptions.connectTimeout = 0;
    }
    this.clientOptions.strictDN = this.clientOptions.strictDN !== false;
    const parsedUrl = url.parse(options.url);
    if (!parsedUrl.protocol || !(parsedUrl.protocol === "ldap:" || parsedUrl.protocol === "ldaps:")) {
      throw new Error(`${options.url} is an invalid LDAP URL (protocol)`);
    }
    const isSecureProtocol = parsedUrl.protocol === "ldaps:";
    this.secure = isSecureProtocol || !!this.clientOptions.tlsOptions;
    this.host = parsedUrl.hostname ?? "localhost";
    if (parsedUrl.port) {
      this.port = Number(parsedUrl.port);
    } else if (isSecureProtocol) {
      this.port = 636;
    } else {
      this.port = 389;
    }
    this.messageParser.on("error", (err) => {
      if (err.messageDetails?.messageId) {
        const messageDetails = this.messageDetailsByMessageId.get(err.messageDetails.messageId.toString());
        if (messageDetails) {
          this.messageDetailsByMessageId.delete(err.messageDetails.messageId.toString());
          messageDetails.reject(err);
          return;
        }
      }
      logDebug(err.stack);
    });
    this.messageParser.on("message", this._handleSendResponse.bind(this));
  }
  get isConnected() {
    return !!this.socket && this.connected;
  }
  async startTLS(options = {}, controls) {
    if (!this.isConnected) {
      await this._connect();
    }
    await this.exop("1.3.6.1.4.1.1466.20037", void 0, controls);
    const originalSocket = this.socket;
    if (originalSocket) {
      originalSocket.removeListener("data", this.socketDataHandler);
      options.socket = originalSocket;
    }
    this.socket = await new Promise((resolve, reject) => {
      const secureSocket = tls__namespace.connect(options);
      secureSocket.once("secureConnect", () => {
        secureSocket.removeAllListeners("error");
        secureSocket.on("data", this.socketDataHandler);
        secureSocket.on("error", () => {
          if (originalSocket) {
            originalSocket.destroy();
          }
        });
        resolve(secureSocket);
      });
      secureSocket.once("error", (err) => {
        secureSocket.removeAllListeners();
        reject(err);
      });
    });
    if (originalSocket) {
      this.socket.id = originalSocket.id;
    }
  }
  /**
   * Performs a simple or sasl authentication against the server.
   * @param {string|DN|SaslMechanism} dnOrSaslMechanism
   * @param {string} [password]
   * @param {Control|Control[]} [controls]
   */
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  async bind(dnOrSaslMechanism, password, controls) {
    if (controls && !Array.isArray(controls)) {
      controls = [controls];
    }
    if (typeof dnOrSaslMechanism === "string" && SASL_MECHANISMS.includes(dnOrSaslMechanism)) {
      await this.bindSASL(dnOrSaslMechanism, password, controls);
      return;
    }
    const req = new BindRequest({
      messageId: this._nextMessageId(),
      dn: typeof dnOrSaslMechanism === "string" ? dnOrSaslMechanism : dnOrSaslMechanism.toString(),
      password,
      controls
    });
    await this._sendBind(req);
  }
  /**
   * Performs a sasl authentication against the server.
   * @param {string|SaslMechanism} mechanism
   * @param {string} [password]
   * @param {Control|Control[]} [controls]
   */
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  async bindSASL(mechanism, password, controls) {
    if (controls && !Array.isArray(controls)) {
      controls = [controls];
    }
    const req = new BindRequest({
      messageId: this._nextMessageId(),
      mechanism,
      password,
      controls
    });
    await this._sendBind(req);
  }
  /**
   * Used to create a new entry in the directory
   * @param {string|DN} dn - The DN of the entry to add
   * @param {Attribute[]|object} attributes - Array of attributes or object where keys are the name of each attribute
   * @param {Control|Control[]} [controls]
   */
  async add(dn, attributes, controls) {
    if (!this.isConnected) {
      await this._connect();
    }
    if (controls && !Array.isArray(controls)) {
      controls = [controls];
    }
    let attributesToAdd;
    if (Array.isArray(attributes)) {
      attributesToAdd = attributes;
    } else {
      attributesToAdd = [];
      for (const [key, value] of Object.entries(attributes)) {
        let values;
        if (Array.isArray(value)) {
          values = value;
        } else if (value == null) {
          values = [];
        } else {
          values = [value];
        }
        attributesToAdd.push(
          new Attribute({
            type: key,
            values
          })
        );
      }
    }
    const req = new AddRequest({
      messageId: this._nextMessageId(),
      dn: typeof dn === "string" ? dn : dn.toString(),
      attributes: attributesToAdd,
      controls
    });
    const result = await this._send(req);
    if (result?.status !== MessageResponseStatus.Success) {
      throw StatusCodeParser.parse(result);
    }
  }
  /**
   * Compares an attribute/value pair with an entry on the LDAP server.
   * @param {string|DN} dn - The DN of the entry to compare attributes with
   * @param {string} attribute
   * @param {string} value
   * @param {Control|Control[]} [controls]
   */
  async compare(dn, attribute, value, controls) {
    if (!this.isConnected) {
      await this._connect();
    }
    if (controls && !Array.isArray(controls)) {
      controls = [controls];
    }
    const req = new CompareRequest({
      messageId: this._nextMessageId(),
      dn: typeof dn === "string" ? dn : dn.toString(),
      attribute,
      value,
      controls
    });
    const response = await this._send(req);
    switch (response?.status) {
      case CompareResult.compareTrue:
        return true;
      case CompareResult.compareFalse:
        return false;
      default:
        throw StatusCodeParser.parse(response);
    }
  }
  /**
   * Deletes an entry from the LDAP server.
   * @param {string|DN} dn - The DN of the entry to delete
   * @param {Control|Control[]} [controls]
   */
  async del(dn, controls) {
    if (!this.isConnected) {
      await this._connect();
    }
    if (controls && !Array.isArray(controls)) {
      controls = [controls];
    }
    const req = new DeleteRequest({
      messageId: this._nextMessageId(),
      dn: typeof dn === "string" ? dn : dn.toString(),
      controls
    });
    const result = await this._send(req);
    if (result?.status !== MessageResponseStatus.Success) {
      throw StatusCodeParser.parse(result);
    }
  }
  /**
   * Performs an extended operation on the LDAP server.
   * @param {string} oid - The object identifier (OID) of the extended operation to perform
   * @param {string|Buffer} [value]
   * @param {Control|Control[]} [controls]
   */
  async exop(oid, value, controls) {
    if (!this.isConnected) {
      await this._connect();
    }
    if (controls && !Array.isArray(controls)) {
      controls = [controls];
    }
    const req = new ExtendedRequest({
      messageId: this._nextMessageId(),
      oid,
      value,
      controls
    });
    const result = await this._send(req);
    if (result?.status !== MessageResponseStatus.Success) {
      throw StatusCodeParser.parse(result);
    }
    return {
      oid: result.oid,
      value: result.value
    };
  }
  /**
   * Performs an LDAP modify against the server.
   * @param {string|DN} dn - The DN of the entry to modify
   * @param {Change|Change[]} changes
   * @param {Control|Control[]} [controls]
   */
  async modify(dn, changes, controls) {
    if (!this.isConnected) {
      await this._connect();
    }
    if (!Array.isArray(changes)) {
      changes = [changes];
    }
    if (controls && !Array.isArray(controls)) {
      controls = [controls];
    }
    const req = new ModifyRequest({
      messageId: this._nextMessageId(),
      dn: typeof dn === "string" ? dn : dn.toString(),
      changes,
      controls
    });
    const result = await this._send(req);
    if (result?.status !== MessageResponseStatus.Success) {
      throw StatusCodeParser.parse(result);
    }
  }
  /**
   * Performs an LDAP modifyDN against the server.
   * @param {string|DN} dn - The DN of the entry to modify
   * @param {string|DN} newDN - The new DN to move this entry to
   * @param {Control|Control[]} [controls]
   */
  async modifyDN(dn, newDN, controls) {
    if (!this.isConnected) {
      await this._connect();
    }
    if (controls && !Array.isArray(controls)) {
      controls = [controls];
    }
    let newSuperior;
    if (typeof newDN === "string" && /[^\\],/.test(newDN)) {
      const parseIndex = newDN.search(/[^\\],/);
      newSuperior = newDN.slice(parseIndex + 2);
      newDN = newDN.slice(0, parseIndex + 1);
    }
    const req = new ModifyDNRequest({
      messageId: this._nextMessageId(),
      dn: typeof dn === "string" ? dn : dn.toString(),
      deleteOldRdn: true,
      newRdn: typeof newDN === "string" ? newDN : newDN.toString(),
      newSuperior,
      controls
    });
    const result = await this._send(req);
    if (result?.status !== MessageResponseStatus.Success) {
      throw StatusCodeParser.parse(result);
    }
  }
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
  async search(baseDN, options = {}, controls) {
    if (!this.isConnected) {
      await this._connect();
    }
    if (controls) {
      if (Array.isArray(controls)) {
        controls = controls.slice(0);
      } else {
        controls = [controls];
      }
    } else {
      controls = [];
    }
    let filter;
    if (options.filter) {
      if (typeof options.filter === "string") {
        filter = FilterParser.parseString(options.filter);
      } else {
        filter = options.filter;
      }
    } else {
      filter = new PresenceFilter({ attribute: "objectclass" });
    }
    const searchRequest = new SearchRequest({
      messageId: -1,
      // NOTE: This will be set from _sendRequest()
      baseDN: typeof baseDN === "string" ? baseDN : baseDN.toString(),
      scope: options.scope,
      filter,
      attributes: options.attributes,
      explicitBufferAttributes: options.explicitBufferAttributes,
      returnAttributeValues: options.returnAttributeValues,
      sizeLimit: options.sizeLimit,
      timeLimit: options.timeLimit,
      controls
    });
    return this._sendSearch(searchRequest);
  }
  /**
   * Unbinds this client from the LDAP server.
   * @returns {void|Promise} void if not connected; otherwise returns a promise to the request to disconnect
   */
  async unbind() {
    if (!this.connected || !this.socket) {
      return;
    }
    const req = new UnbindRequest({
      messageId: this._nextMessageId()
    });
    await this._send(req);
  }
  async _sendBind(req) {
    if (!this.isConnected) {
      await this._connect();
    }
    const result = await this._send(req);
    if (result?.status !== MessageResponseStatus.Success) {
      throw StatusCodeParser.parse(result);
    }
  }
  async _sendSearch(searchRequest) {
    searchRequest.messageId = this._nextMessageId();
    const result = await this._send(searchRequest);
    if (result?.status !== MessageResponseStatus.Success && !(result?.status === MessageResponseStatus.SizeLimitExceeded && searchRequest.sizeLimit)) {
      throw StatusCodeParser.parse(result);
    }
    return result;
  }
  _nextMessageId() {
    this.messageId += 1;
    if (this.messageId >= MAX_MESSAGE_ID) {
      this.messageId = 1;
    }
    return this.messageId;
  }
  /**
   * Open the socket connection
   * @returns {Promise<void>}
   * @private
   */
  _connect() {
    if (this.isConnected) {
      return;
    }
    return new Promise((resolve, reject) => {
      if (this.secure) {
        this.socket = tls__namespace.connect(this.port, this.host, this.clientOptions.tlsOptions);
        this.socket.id = uuid.v4();
        this.socket.once("secureConnect", () => {
          this._onConnect(resolve);
        });
      } else {
        this.socket = net__namespace.connect(this.port, this.host);
        this.socket.id = uuid.v4();
        this.socket.once("connect", () => {
          this._onConnect(resolve);
        });
      }
      this.socket.once("error", (err) => {
        if (this.connectTimer) {
          clearTimeout(this.connectTimer);
          delete this.connectTimer;
        }
        reject(err);
      });
      if (this.clientOptions.connectTimeout) {
        this.connectTimer = setTimeout(() => {
          if (this.socket && (!this.socket.readable || !this.socket.writable)) {
            this.connected = false;
            this.socket.destroy();
            delete this.socket;
          }
          reject(new Error("Connection timeout"));
        }, this.clientOptions.connectTimeout);
      }
    });
  }
  _onConnect(next) {
    if (this.connectTimer) {
      clearTimeout(this.connectTimer);
    }
    if (this.socket) {
      this.socket.removeAllListeners("error");
      this.socket.removeAllListeners("connect");
      this.socket.removeAllListeners("secureConnect");
    }
    this.connected = true;
    const socketError = (err) => {
      for (const [key, messageDetails] of this.messageDetailsByMessageId.entries()) {
        if (messageDetails.message instanceof UnbindRequest) {
          messageDetails.resolve();
        } else {
          messageDetails.reject(
            new Error(
              `Socket error. Message type: ${messageDetails.message.constructor.name} (0x${messageDetails.message.protocolOperation.toString(16)})
${err.message || (err.stack ?? "Unknown socket error")}`
            )
          );
        }
        this.messageDetailsByMessageId.delete(key);
      }
      if (this.socket) {
        this.socket.destroy();
      }
    };
    function socketEnd() {
      if (this) {
        this.end();
      }
    }
    function socketTimeout() {
      if (this) {
        this.end();
      }
    }
    const clientInstance = this;
    function socketClose() {
      if (this) {
        this.removeListener("error", socketError);
        this.removeListener("close", socketClose);
        this.removeListener("data", clientInstance.socketDataHandler);
        this.removeListener("end", socketEnd);
        this.removeListener("timeout", socketTimeout);
      }
      if (this === clientInstance.socket) {
        clientInstance.connected = false;
        delete clientInstance.socket;
      }
      for (const [key, messageDetails] of clientInstance.messageDetailsByMessageId.entries()) {
        if (messageDetails.socket.id === this.id) {
          if (messageDetails.message instanceof UnbindRequest) {
            messageDetails.resolve();
          } else {
            messageDetails.reject(
              new Error(
                `Connection closed before message response was received. Message type: ${messageDetails.message.constructor.name} (0x${messageDetails.message.protocolOperation.toString(16)})`
              )
            );
          }
          clientInstance.messageDetailsByMessageId.delete(key);
        }
      }
    }
    if (this.socket) {
      this.socket.on("error", socketError);
      this.socket.on("close", socketClose);
      this.socket.on("data", this.socketDataHandler);
      this.socket.on("end", socketEnd);
      this.socket.on("timeout", socketTimeout);
    }
    next();
  }
  _endSocket(socket) {
    if (socket === this.socket) {
      this.connected = false;
    }
    socket.removeAllListeners("error");
    socket.on("error", () => {
    });
    socket.end();
  }
  /**
   * Sends request message to the ldap server over the connected socket. Each message request is given a
   * unique id (messageId), used to identify the associated response when it is sent back over the socket.
   *
   * @returns {Promise<Message>}
   * @private
   * @param {object} message
   */
  _send(message) {
    if (!this.connected || !this.socket) {
      throw new Error("Socket connection not established");
    }
    const messageContentBuffer = message.write();
    let messageResolve = () => {
    };
    let messageReject = () => {
    };
    const sendPromise = new Promise((resolve, reject) => {
      messageResolve = resolve;
      messageReject = reject;
    });
    this.messageDetailsByMessageId.set(message.messageId.toString(), {
      message,
      // @ts-expect-error - Both parameter types extend MessageResponse but typescript sees them as different types
      resolve: messageResolve,
      reject: messageReject,
      timeoutTimer: this.clientOptions.timeout ? setTimeout(() => {
        const messageDetails = this.messageDetailsByMessageId.get(message.messageId.toString());
        if (messageDetails) {
          this._endSocket(messageDetails.socket);
          messageReject(new Error(`${message.constructor.name}: Operation timed out`));
        }
      }, this.clientOptions.timeout) : null,
      socket: this.socket
    });
    if (message.password) {
      logDebug(
        `Sending message: ${JSON.stringify({
          ...message,
          password: "__redacted__"
        })}`
      );
    } else {
      logDebug(`Sending message: ${JSON.stringify(message)}`);
    }
    this.socket.write(messageContentBuffer, () => {
      if (message instanceof AbandonRequest) {
        logDebug(`Abandoned message: ${message.messageId}`);
        this.messageDetailsByMessageId.delete(message.messageId.toString());
        messageResolve();
      } else if (message instanceof UnbindRequest) {
        logDebug("Unbind success. Ending socket");
        if (this.socket) {
          this._endSocket(this.socket);
        }
      } else {
        logDebug("Message sent successfully.");
      }
    });
    return sendPromise;
  }
  _handleSendResponse(message) {
    const messageDetails = this.messageDetailsByMessageId.get(message.messageId.toString());
    if (messageDetails) {
      if (message instanceof SearchEntry) {
        messageDetails.searchEntries = messageDetails.searchEntries ?? [];
        messageDetails.searchEntries.push(message);
      } else if (message instanceof SearchReference) {
        messageDetails.searchReferences = messageDetails.searchReferences ?? [];
        messageDetails.searchReferences.push(message);
      } else if (message instanceof SearchResponse) {
        if (messageDetails.searchEntries) {
          message.searchEntries.push(...messageDetails.searchEntries);
        }
        if (messageDetails.searchReferences) {
          message.searchReferences.push(...messageDetails.searchReferences);
        }
        this.messageDetailsByMessageId.delete(message.messageId.toString());
        messageDetails.resolve(message);
      } else {
        this.messageDetailsByMessageId.delete(message.messageId.toString());
        messageDetails.resolve(message);
      }
    } else {
      logDebug(`Unable to find details related to message response: ${JSON.stringify(message)}`);
    }
  }
}

exports.AbandonRequest = AbandonRequest;
exports.AddRequest = AddRequest;
exports.AddResponse = AddResponse;
exports.AdminLimitExceededError = AdminLimitExceededError;
exports.AffectsMultipleDSAsError = AffectsMultipleDSAsError;
exports.AliasDerefProblemError = AliasDerefProblemError;
exports.AliasProblemError = AliasProblemError;
exports.AlreadyExistsError = AlreadyExistsError;
exports.AndFilter = AndFilter;
exports.ApproximateFilter = ApproximateFilter;
exports.Attribute = Attribute;
exports.AuthMethodNotSupportedError = AuthMethodNotSupportedError;
exports.BindRequest = BindRequest;
exports.BindResponse = BindResponse;
exports.BusyError = BusyError;
exports.Change = Change;
exports.Client = Client;
exports.CompareRequest = CompareRequest;
exports.CompareResponse = CompareResponse;
exports.CompareResult = CompareResult;
exports.ConfidentialityRequiredError = ConfidentialityRequiredError;
exports.ConstraintViolationError = ConstraintViolationError;
exports.Control = Control;
exports.ControlParser = ControlParser;
exports.DN = DN;
exports.DeleteRequest = DeleteRequest;
exports.DeleteResponse = DeleteResponse;
exports.EntryChangeNotificationControl = EntryChangeNotificationControl;
exports.EqualityFilter = EqualityFilter;
exports.ExtendedRequest = ExtendedRequest;
exports.ExtendedResponse = ExtendedResponse;
exports.ExtendedResponseProtocolOperations = ExtendedResponseProtocolOperations;
exports.ExtensibleFilter = ExtensibleFilter;
exports.FilterParser = FilterParser;
exports.GreaterThanEqualsFilter = GreaterThanEqualsFilter;
exports.InappropriateAuthError = InappropriateAuthError;
exports.InappropriateMatchingError = InappropriateMatchingError;
exports.InsufficientAccessError = InsufficientAccessError;
exports.InvalidCredentialsError = InvalidCredentialsError;
exports.InvalidDNSyntaxError = InvalidDNSyntaxError;
exports.InvalidSyntaxError = InvalidSyntaxError;
exports.IsLeafError = IsLeafError;
exports.LessThanEqualsFilter = LessThanEqualsFilter;
exports.LoopDetectError = LoopDetectError;
exports.MessageParser = MessageParser;
exports.MessageParserError = MessageParserError;
exports.MessageResponseStatus = MessageResponseStatus;
exports.ModifyDNRequest = ModifyDNRequest;
exports.ModifyDNResponse = ModifyDNResponse;
exports.ModifyRequest = ModifyRequest;
exports.ModifyResponse = ModifyResponse;
exports.NamingViolationError = NamingViolationError;
exports.NoObjectClassModsError = NoObjectClassModsError;
exports.NoResultError = NoResultError;
exports.NoSuchAttributeError = NoSuchAttributeError;
exports.NoSuchObjectError = NoSuchObjectError;
exports.NotAllowedOnNonLeafError = NotAllowedOnNonLeafError;
exports.NotAllowedOnRDNError = NotAllowedOnRDNError;
exports.NotFilter = NotFilter;
exports.ObjectClassViolationError = ObjectClassViolationError;
exports.OperationsError = OperationsError;
exports.OrFilter = OrFilter;
exports.PagedResultsControl = PagedResultsControl;
exports.PersistentSearchControl = PersistentSearchControl;
exports.PresenceFilter = PresenceFilter;
exports.ProtocolError = ProtocolError;
exports.ProtocolOperation = ProtocolOperation;
exports.ResultCodeError = ResultCodeError;
exports.ResultsTooLargeError = ResultsTooLargeError;
exports.SASL_MECHANISMS = SASL_MECHANISMS;
exports.SaslBindInProgressError = SaslBindInProgressError;
exports.SearchEntry = SearchEntry;
exports.SearchFilter = SearchFilter;
exports.SearchReference = SearchReference;
exports.SearchRequest = SearchRequest;
exports.SearchResponse = SearchResponse;
exports.ServerSideSortingRequestControl = ServerSideSortingRequestControl;
exports.SizeLimitExceededError = SizeLimitExceededError;
exports.StatusCodeParser = StatusCodeParser;
exports.StrongAuthRequiredError = StrongAuthRequiredError;
exports.SubstringFilter = SubstringFilter;
exports.TLSNotSupportedError = TLSNotSupportedError;
exports.TimeLimitExceededError = TimeLimitExceededError;
exports.TypeOrValueExistsError = TypeOrValueExistsError;
exports.UnavailableCriticalExtensionError = UnavailableCriticalExtensionError;
exports.UnavailableError = UnavailableError;
exports.UnbindRequest = UnbindRequest;
exports.UndefinedTypeError = UndefinedTypeError;
exports.UnknownStatusCodeError = UnknownStatusCodeError;
exports.UnwillingToPerformError = UnwillingToPerformError;
