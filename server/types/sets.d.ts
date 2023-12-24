// Local Imports
import { 
  AbilityRule,
  AbilityRuleReference,
} from './abilities';
import {
  BooleanAbilityRule,
  NumericAbilityRule,
} from './primitives';
import {
  ExecutionsAbilityRule,
  MurdersAbilityRule,
} from './kills';
import { PlayersAbilityRule } from './players';
import { AlignmentAbilityRule } from './alignments';
import { CharactersAbilityRule } from './characters';

/**
 * Rule values that are lists.
 */
export type ListAbilityRule = SetAbilityRule
  | PlayersAbilityRule
  | AlignmentAbilityRule
  | CharactersAbilityRule
  | ExecutionsAbilityRule
  | MurdersAbilityRule
  | AbilityRuleReference;

/**
 * Size of a list.
 */
export interface CountOfAbilityRule extends NumericAbilityRule {
  operator: 'count-of';

  /**
   * Values to unionize.
   */
  set: ListAbilityRule;
}

/**
 * Does work on a set.
 */
export interface SetAbilityRule extends AbilityRule {
  type: 'set';

  /**
   * What function to run 
   */
  function: string;

  /**
   * Set parameters. If not a list, turn into a list.
   */
  sets: AbilityRule[] | AbilityRule;

  /**
   * Set parameters. If not a list, turn into a list.
   */
  set: AbilityRule[] | AbilityRule;

  /**
   * Reference for current element.
   */
  referencePrevious?: number;

  /**
   * Reference for current element.
   */
  referenceableCurrent?: number;

  /**
   * Reference for current element.
   */
  referenceableNext?: number;
}

/**
 * Combines two sets together.
 */
export interface UnionAbilityRule extends SetAbilityRule {
  function: 'union';
}

/**
 * Intersection of two sets.
 */
export interface IntersectionAbilityRule extends SetAbilityRule {
  function: 'intersection';
}

/**
 * Difference of two sets.
 */
export interface DifferenceAbilityRule extends SetAbilityRule {
  function: 'difference';
}

/**
 * Filters a set based on a condition.
 */
export interface FilterAbilityRule extends SetAbilityRule {
  function: 'filter';

  /**
   * Validator to be used to on each item.
   */
  condition: BooleanAbilityRule;
}

/**
 * Returns a list of items after each item from the previous list has been processed.
 */
export interface MapAbilityRule extends SetAbilityRule {
  function: 'map';

  /**
   * Ability rules to be run on each item.
   */
  modifier: AbilityRule;
}

/**
 * Checks for a value in a list.
 */
export interface IncludesAbilityRule extends BooleanAbilityRule {
  query: 'includes';

  /**
   * Value to check for.
   */
  value: AbilityRule;

  /**
   * Set to look through.
   */
  set: ListAbilityRule;
}
