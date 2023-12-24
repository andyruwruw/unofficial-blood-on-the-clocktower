/**
 * Rule that dictates ability capabilities.
 */
export interface AbilityRule {
  /**
   * Type of ability rule.
   */
  type: string;

  /**
   * Reference ID for nested rules.
   */
  referenceable?: number;
}

/**
 * Allows referencing to another value.
 */
export interface AbilityRuleReference extends AbilityRule {
  type: string;

  /**
   * Assigned reference.
   */
  reference: number;
}
