---
title: Firebolt
---
# Firebolt Schema
---
Version 0.7.0


## JSON-Schema
This document was generated from a JSON-Schema, and is intended to provide a human readable overview and examples of the methods contained in the module.

For the full schema, see the link below.

| Schema |
|--------|
| [firebolt.json](https://github.com/rdkcentral/firebolt-openrpc/blob/feature/badger-parity/src/schemas/firebolt.json) |

## Table of Contents
 
 - Schemas
    - [FireboltSpecification](#fireboltspecification)
    - [SemanticVersion](#semanticversion)
    - [Capability](#capability)
    - [RolePolicy](#rolepolicy)
    - [CapabilityKey](#capabilitykey)
    - [UserGrantKey](#usergrantkey)
    - [MethodInfo](#methodinfo)


## Schemas

### FireboltSpecification

```typescript
type FireboltSpecification = {
  version: string
  capabilities: Capability[]
  methods?: MethodInfo[]
}
```




<details>
  <summary><b>Examples</b></summary>

```json
```

</details>




---

### SemanticVersion

```typescript
type SemanticVersion = string
```




<details>
  <summary><b>Examples</b></summary>

```json
```

</details>




---

### Capability

```typescript
type Capability = {
  id: string
  level: 'must' | 'should' | 'could'  // Whether this capabilty is a compliance requirement, a compliance recommendation, or optional.
  use: RolePolicy                     // An access policy for a particular role of a capability.
  manage: RolePolicy                  // An access policy for a particular role of a capability.
  provide: RolePolicy                 // An access policy for a particular role of a capability.
  delegable?: boolean                 // Whether this capability may be provided by applications.
}
```




<details>
  <summary><b>Examples</b></summary>

```json
```

</details>


#### Details

A Firebolt Capability that must, should, or could be implemented by a particular Firebolt implementation.


---

### RolePolicy

```typescript
type RolePolicy = {
  public?: boolean     // May this capability & role be assigned to applications by distributors.
  negotiable: boolean  // May this policy be overridden by Firebolt distributors.
}
```




<details>
  <summary><b>Examples</b></summary>

```json
```

</details>


#### Details

An access policy for a particular role of a capability.


---

### CapabilityKey

```typescript
type CapabilityKey = string
```




<details>
  <summary><b>Examples</b></summary>

```json
```

</details>




---

### UserGrantKey

```typescript
type UserGrantKey = string
```




<details>
  <summary><b>Examples</b></summary>

```json
```

</details>




---

### MethodInfo

```typescript
type MethodInfo = {
  method: string
  type: 'firebolt' | 'w3c'
  uses?: string[]
  provides?: string[]
  manages?: string[]
}
```




<details>
  <summary><b>Examples</b></summary>

```json
```

</details>




---


