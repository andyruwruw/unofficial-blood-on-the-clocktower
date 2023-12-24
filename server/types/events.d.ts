// Local Imports
import { AbilityRule } from './abilities';
import { AbilityRuleBlock } from './controls';
import { NumericAbilityRule } from './primitives';

/**
 * Event types that specify a target.
 */
export type AbilityRuleEventTargetableValue = 'nomination'
  | 'execution'
  | 'murder'
  | 'vote';

/**
 * Event types that specify a stage.
 */
export type AbilityRuleEventTimeValue = 'set-up'
  | 'first-night'
  | 'every-night'
  | 'every-subsequent-night'
  | 'morning'
  | 'day-anytime'
  | 'nomination-stage'
  | 'voting-stage'
  | 'dusk';

/**
 * All event types.
 */
export type AbilityRuleEventValue = 'passive'
  | AbilityRuleEventTargetableValue
  | AbilityRuleEventTimeValue;

/**
 * Alters timing during event.
 */
export type AbilityRuleEventModifier = 'before'
  | 'during'
  | 'after';

/**
 * Event ability rule.
 */
export interface AbilityRuleEvent extends AbilityRuleBlock {
  type: 'event';

  /**
   * Event type.
   */
  value: AbilityRuleEventValue;

  /**
   * Alters timing during event.
   */
  modifier?: AbilityRuleEventModifier;

  /**
   * Priority during event.
   */
  priority?: number;
}

/**
 * Signifies a given day.
 */
export interface DayAbilityRule extends AbilityRule {
  type: 'day';
}

/**
 * Signifies a specific day.
 */
export interface DayAbilityRuleValue extends DayAbilityRule {
  value: NumericAbilityRule;
}

/**
 * Signifies the current day.
 */
export interface Today extends DayAbilityRule {
  selector: 'today';
}

/**
 * Signifies the current day.
 */
export interface FromToday extends DayAbilityRule {
  selector: 'from-today';

  /**
   * Difference from today.
   */
  difference: NumericAbilityRule;
}
