// Local Imports
import { AbilityRule } from './abilities';

/**
 * Primative data types.
 */
export type PrimativeTypes = 'boolean'
  | 'string'
  | 'number';

/**
 * Seat directions.
 */
export type AbilityRuleValueDirection = 'left' | 'right' | 'both';

/**
 * Rules that result in a boolean value.
 */
export interface BooleanAbilityRule extends AbilityRule {
  type: 'boolean';

  query?: string;

  value?: boolean | AbilityRule;
}

/**
 * Rules that result in a boolean value.
 */
export interface BooleanAbilityRuleValue extends BooleanAbilityRule {
  value: boolean;
}

/**
 * Ability rules that resolve into a number.
 */
export interface NumericAbilityRule extends AbilityRule {
  type: 'number';
}

/**
 * Straight number.
 */
export interface NumericAbilityRuleValue extends NumericAbilityRule {
  value: number;
}

/**
 * Addition.
 */
export interface AddAbilityRule extends NumericAbilityRule {
  operator: 'add';

  values: NumericAbilityRule[];
}

/**
 * Subtraction.
 */
export interface SubtractAbilityRule extends NumericAbilityRule {
  operator: 'subtract';

  value: NumericAbilityRule;

  subtractor: NumericAbilityRule;
}

/**
 * Multiplication.
 */
export interface MultiplyAbilityRule extends NumericAbilityRule{
  operator: 'multiply';

  values: NumericAbilityRule[];
}

/**
 * Ways to round off division.
 */
export type DivisionRounding = 'round' | 'ceil' | 'floor' | 'exact';

/**
 * Division.
 */
export interface DivideAbilityRule extends NumericAbilityRule {
  operator: 'divide';

  value: NumericAbilityRule;

  divisor: NumericAbilityRule;

  round?: DivisionRounding;
}

/**
 * Negates the value.
 */
export interface NotAbilityRule extends BooleanAbilityRule {
  query: 'not';

  /**
   * Value to negate.
   */
  condition: BooleanAbilityRule;
}

/**
 * Applies logic to two values.
 */
export interface LogicAbilityRule extends BooleanAbilityRule {
  /**
   * Value to negate.
   */
  conditions: BooleanAbilityRule[];
}

/**
 * Or of two boolean values.
 */
export interface OrAbilityRule extends LogicAbilityRule {
  query: 'or';
}

/**
 * And of two boolean values.
 */
export interface AndAbilityRule extends LogicAbilityRule {
  query: 'and';
}

/**
 * Compares two values.
 */
export interface ComparisonAbilityRule extends BooleanAbilityRule {
  /**
   * Value to compare.
   */
  values: BooleanAbilityRule[];
}

/**
 * Tests the equality of two items.
 */
export interface EqualsAbilityRule extends ComparisonAbilityRule {
  query: 'equals';
}

/**
 * Tests if the prior item is greater than subsequent item(s).
 */
export interface GreaterThanAbilityRule extends ComparisonAbilityRule {
  query: 'gt';
}

/**
 * Tests if the prior item is less than subsequent item(s).
 */
export interface LessThanAbilityRule extends ComparisonAbilityRule {
  query: 'lt';
}

/**
 * Tests if the prior item is greater than or equal to subsequent item(s).
 */
export interface GreaterThanOrEqualAbilityRule extends ComparisonAbilityRule {
  query: 'gte';
}

/**
 * Tests if the prior item is less than or equal to subsequent item(s).
 */
export interface LessThanOrEqualAbilityRule extends ComparisonAbilityRule {
  query: 'lte';
}