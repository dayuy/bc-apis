/**
 * 由 src/kubernetes/gen/index.ts 自动生成
 * !!! 请不要修改 !!!
 */
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Proposal defines all proposals that require a vote in the federation.
 */
export interface Proposal {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: string;
  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: string;
  metadata?: {
    [k: string]: any;
  };
  spec?: {
    addMember?: {
      members: string[];
      [k: string]: any;
    };
    archiveChannel?: {
      channel: string;
      description?: string;
      [k: string]: any;
    };
    createFederation?: {
      [k: string]: any;
    };
    deleteMember?: {
      member: string;
      [k: string]: any;
    };
    deployChaincode?: {
      chaincode: string;
      externalBuilder: string;
      members: {
        initiator?: boolean;
        /**
         * JoinedAt is the proposal succ time
         */
        joinedAt?: string;
        /**
         * JoinedBy is the proposal name which joins this member into federation
         */
        joinedBy?: string;
        name?: string;
        [k: string]: any;
      }[];
      [k: string]: any;
    };
    deprecated?: boolean;
    dissolveFederation?: {
      [k: string]: any;
    };
    dissolveNetwork?: {
      name: string;
      [k: string]: any;
    };
    endAt?: string;
    federation: string;
    initiatorOrganization: string;
    /**
     * Policy defines the Proposal-Vote policy  to indicate when a proposal is successful
     */
    policy: string;
    startAt?: string;
    unarchiveChannel?: {
      channel: string;
      description?: string;
      [k: string]: any;
    };
    upgradeChaincode?: {
      chaincode: string;
      externalBuilder: string;
      members: {
        initiator?: boolean;
        /**
         * JoinedAt is the proposal succ time
         */
        joinedAt?: string;
        /**
         * JoinedBy is the proposal name which joins this member into federation
         */
        joinedBy?: string;
        name?: string;
        [k: string]: any;
      }[];
      [k: string]: any;
    };
    [k: string]: any;
  };
  status?: {
    conditions?: {
      /**
       * Last time the condition transitioned from one status to another.
       */
      lastTransitionTime?: string;
      /**
       * Human-readable message indicating details about last transition.
       */
      message?: string;
      /**
       * Unique, one-word, CamelCase reason for the condition's last transition.
       */
      reason?: string;
      /**
       * Status is the status of the condition. Can be True, False, Unknown.
       */
      status: string;
      /**
       * Type is the type of the condition.
       */
      type: string;
      [k: string]: any;
    }[];
    /**
     * A human readable message indicating details about why the proposal is in this condition.
     */
    message?: string;
    /**
     * todo comment
     */
    phase?: string;
    /**
     * A brief CamelCase message indicating details about why the proposal is in this state. e.g. 'Expired'
     */
    reason?: string;
    /**
     * The list has one entry per init container in the manifest. The most recent successful init container will have ready = true, the most recently started container will have startTime set. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#pod-and-container-status
     */
    votes?: {
      decision?: boolean;
      description: string;
      name?: string;
      namespace?: string;
      organization: {
        name?: string;
        namespace?: string;
        [k: string]: any;
      };
      /**
       * VotePhase is a label for the condition of a vote at the current time.
       */
      phase?: string;
      voteTime?: string;
      [k: string]: any;
    }[];
    [k: string]: any;
  };
  [k: string]: any;
}
