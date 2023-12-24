// Local Imports
import {
  AbilityRule,
  AbilityRuleReference,
} from './abilities';
import { DayAbilityRule } from './events';
import { PlayerAbilityRule } from './players';

/**
 * Resolves to an execution.
 */
export interface ExecutionAbilityRule extends AbilityRule {
  type: 'execution';
}

/**
 * Resolves to a set of executions.
 */
export interface ExecutionsAbilityRule extends AbilityRule {
  type: 'execution-list';
}

/**
 * Resolves to a murder.
 */
export interface MurderAbilityRule extends AbilityRule {
  type: 'murder';
}

/**
 * Resolves to a set of murder.
 */
export interface MurdersAbilityRule extends AbilityRule {
  type: 'murder-list';
}

/**
 * Resolves to the last execution.
 */
export interface LastExecutionAbilityRule extends ExecutionAbilityRule {
  selector: 'last';
}

/**
 * Resolves to the last murder.
 */
export interface LastMurderAbilityRule extends MurderAbilityRule {
  selector: 'last';
}

/**
 * Resolves to the next execution.
 */
export interface NextExecutionAbilityRule extends ExecutionAbilityRule {
  selector: 'next';
}

/**
 * Resolves to the next murder.
 */
export interface NextMurderAbilityRule extends MurderAbilityRule {
  selector: 'lastnext';
}

/**
 * Resolves to the guilty player of a murder.
 */
export interface MurdererAbilityRule extends PlayerAbilityRule {
  selector: 'murderer';

  context: MurderAbilityRule
    | AbilityRuleReference;
}

/**
 * Resolves to the victim player of a murder.
 */
export interface VictimAbilityRule extends PlayerAbilityRule {
  selector: 'victim';

  context: MurderAbilityRule
    | AbilityRuleReference;
}

/**
 * Resolves a day's executions
 */
export interface DayExecutionsAbilityRule extends ExecutionsAbilityRule {
  day: DayAbilityRule;
}

/**
 * Resolves a day's murders.
 */
export interface DaysMurdersAbilityRule extends MurdersAbilityRule {
  day: DayAbilityRule;
}
