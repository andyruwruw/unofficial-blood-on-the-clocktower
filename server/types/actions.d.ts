// Local Imports
import {
  AbilityRule,
  AbilityRuleReference,
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
  ExecutionAbilityRule,
  MurderAbilityRule,
} from './kills';
import { AbilityRuleBlock } from './controls';
import { AlignmentAbilityRule } from './alignments';
import { BooleanAbilityRule } from './primitives';

/**
 * Abilty rule action that targets someone.
 */
export interface TargetableAbilityRule extends AbilityRule {
  /**
   * Who to do the thing.
   */
  target: PlayerAbilityRule
    | PlayersAbilityRule
    | CharacterAbilityRule
    | CharactersAbilityRule
    | AbilityRuleReference;
}

/**
 * All rules nested have limited uses.
 */
export interface LimitedUsesAbilityRule extends AbilityRuleBlock {
  type: 'limited-uses';

  /**
   * Number of uses.
   */
  count: number;
}

/**
 * All rules nested are optional.
 */
export interface OptionalAbilityRule extends AbilityRuleBlock {
  type: 'optional';
}

/**
 * Makes a team win.
 */
export interface WinAbilityRule extends AbilityRule {
  type: 'win';

  alignment: AlignmentAbilityRule;
}

/**
 * Makes a team lose.
 */
export interface LoseAbilityRule extends AbilityRule {
  type: 'lose';

  alignment: AlignmentAbilityRule;
}

/**
 * Sends a message out.
 */
export interface ProclaimAbilityRule extends AbilityRule {
  type: 'proclaimation';

  /**
   * Content to send.
   */
  content: string;

  /**
   * Optional icon for message.
   */
  icon?: string;

  /**
   * Sound key to play with message.
   */
  sound?: string;

  /**
   * Limit players if desired.
   */
  audience?: PlayersAbilityRule;
}

/**
 * Kills someone.
 */
export interface KillAbilityRule extends TargetableAbilityRule {
  type: 'kill';
}

/**
 * Ressurect someone.
 */
export interface RessurectAbilityRule extends TargetableAbilityRule {
  type: 'ressurect';
}

/**
 * Executes someone.
 */
export interface ExecuteAbilityRule extends TargetableAbilityRule {
  type: 'execute';

  /**
   * Whether to force the execution.
   */
  force: BooleanAbilityRule;

  /**
   * Whether this counts as the daily and only execution.
   * Default is yes.
   */
  daily: BooleanAbilityRule;
}

/**
 * Learn some information.
 */
export interface LearnAbilityRule extends AbilityRuleBlock {
  type: 'learn';

  /**
   * How to state the learned item.
   */
  context: string;
}

/**
 * Switches out the victim of a death with another.
 */
export interface ChangeVictimAbilityRule extends AbilityRule {
  type: 'change-victim';

  /**
   * What death to change.
   */
  context: MurderAbilityRule
    | ExecutionAbilityRule
    | AbilityRuleReference;

  /**
   * Who will die now.
   */
  victim: PlayerAbilityRule
    | CharacterAbilityRule
    | AbilityRuleReference;
}

/**
 * Allows a user to view the grimoire.
 */
export interface ViewGrimoireAbilityRule extends TargetableAbilityRule {
  type: 'grimoire';
}

/**
 * Gives a user fake abilities from a character.
 */
export interface GiveDrunkAbilitiesAbilityRule extends TargetableAbilityRule {
  type: 'drunk-abilities';

  character: CharacterAbilityRule
    | AbilityRuleReference;
}
