// Local Imports
import {
  AbilityRule,
  AbilityRuleReference
} from './abilities';
import {
  CharacterAbilityRule,
  CharactersAbilityRule,
} from './characters';
import {
  PlayerAbilityRule,
  PlayersAbilityRule,
} from './players';
import {
  BooleanAbilityRule,
  NumericAbilityRule,
} from './primitives';
import {
  ExecutionAbilityRule,
  MurderAbilityRule,
} from './kills';
import { AlignmentAbilityRule } from './alignments';

/**
 * Block of rules to be run.
 */
export interface AbilityRuleBlock extends AbilityRule {
  /**
   * Subrules.
   */
  rules: AbilityRule[];
}

/**
 * Types of conditional ability rules.
 */
export type ConditionalAbilityRuleType = 'if' | 'else-if' | 'else';

/**
 * Runs rules if condition is true.
 */
export interface ConditionalAbilityRule extends AbilityRuleBlock {
  type: ConditionalAbilityRuleType;

  /**
   * Condition to trigger block.
   */
  condition: BooleanAbilityRule;
}

/**
 * Runs rules if condition is true.
 */
export interface IfAbilityRule extends ConditionalAbilityRule {
  type: 'if';
}

/**
 * Runs rules if condition is true and previous if or else if didn't run.
 * 
 * Will not run without a previous if.
 */
export interface ElseIfAbilityRule extends ConditionalAbilityRule {
  type: 'else-if';
}

/**
 * Runs rules if previous if or else if's didn't run.
 * 
 * Will not run without a previous if.
 */
export interface ElseAbilityRule extends AbilityRuleBlock {
  type: 'else';
}

/**
 * Manipulate player variables.
 */
export interface PlayerVariableAbilityRule extends AbilityRuleBlock {
  type: 'player-variable';
}

/**
 * Manipulate player variables.
 */
export interface SetPlayerVariableAbilityRule extends PlayerVariableAbilityRule {
  operation: 'set';

  /**
   * Key of the variable.
   */
  key: string;

  /**
   * Value to set.
   */
  value: BooleanAbilityRule
    | NumericAbilityRule
    | PlayerAbilityRule
    | PlayersAbilityRule
    | CharacterAbilityRule
    | CharactersAbilityRule
    | AlignmentAbilityRule
    | ExecutionAbilityRule
    | MurderAbilityRule
    | AbilityRuleReference;
}

/**
 * Manipulate player variables.
 */
export interface GetPlayerVariableAbilityRule extends AbilityRule{
  operation: 'get';

  /**
   * Key of the variable.
   */
  key: string;
}

/**
 * Manipulate global variables.
 */
export interface GlobalVariableAbilityRule extends AbilityRuleBlock {
  type: 'global-variable';
}

/**
 * Manipulate global variables.
 */
export interface SetGlobalVariableAbilityRule extends GlobalVariableAbilityRule {
  operation: 'set';

  /**
   * Key of the variable.
   */
  key: string;

  /**
   * Value to set.
   */
  value: PlayerAbilityRule
    | CharacterAbilityRule
    | AlignmentAbilityRule
    | BooleanAbilityRule
    | NumericAbilityRule
    | AbilityRuleReference
    | ExecutionAbilityRule
    | MurderAbilityRule
    | PlayersAbilityRule
    | CharactersAbilityRule;
}

/**
 * Manipulate global variables.
 */
export interface GetGlobalVariableAbilityRule extends AbilityRule {
  operation: 'get';

  /**
   * Key of the variable.
   */
  key: string;
}
