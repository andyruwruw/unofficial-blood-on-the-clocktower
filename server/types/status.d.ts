// Local Imports
import {
  BooleanAbilityRule,
  NumericAbilityRule,
} from './primitives';
import { AbilityRule } from './abilities';
import { TargetableAbilityRule } from './actions';
import { PlayerAbilityRule, PlayersAbilityRule } from './players';
import { CharacterClassAbilityRule } from './characters';
import { AlignmentAbilityRule } from './alignments';

/**
 * Debuff status types.
 */
export type DebuffStatus = 'yes' | 'no' | `${number}-days` | 'resistance';

/**
 * Debuff status for whisper.
 */
export type WhisperDebuffStatus = 'yes' | 'no' | 'neighbors';

/**
 * References to a status.
 */
export interface DebuffStatusAbilityRule extends AbilityRule {
  type: 'status',
}

/**
 * References to a status.
 */
export interface DebuffStatusAbilityRuleValue extends DebuffStatusAbilityRule {
  value: DebuffStatus;
}

/**
 * Ability rule actions that target someone and change a status.
 */
export interface StatusChangeAbilityRule extends TargetableAbilityRule, DebuffStatusAbilityRule {
  type: 'status';
  
  /**
   * What kind of debuff.
   */
  debuff: string;
  
  /**
   * Status of trait.
   */
  status?: DebuffStatus
    | BooleanAbilityRule
    | WhisperDebuffStatus
    | NumericAbilityRule;

  /**
   * Could get or set status. Getting status would result in a DebuffStatusAbilityRule.
   */
  action?: 'get' | 'set';
}

/**
 * Poison someone.
 */
export interface PoisonStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'poison';

  status?: DebuffStatus;
}

/**
 * Get someone drunk.
 */
export interface DrunkStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'intoxicate';

  status?: DebuffStatus;
}

/**
 * Enrage someone.
 */
export interface MadStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'enrage';

  status?: DebuffStatus;
}

/**
 * A players invulnerability to murder in the night.
 */
export interface InvulnerabilityToMurderStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'murder-resistance';

  status?: DebuffStatus;
}

/**
 * A players invulnerability to execution.
 */
export interface InvulnerabilityToExecutionStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'execution-resistance';

  status?: DebuffStatus;
}

/**
 * Whether a player appears as dead.
 */
export interface AppearDeadStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'appear-dead';

  status?: DebuffStatus;
}

/**
 * Whether a player appears as good.
 */
export interface AppearGoodStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'appear-good';

  status?: DebuffStatus;
}

/**
 * Whether a player appears as evil.
 */
export interface AppearEvilStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'appear-evil';

  status?: DebuffStatus;
}

/**
 * Whether a player appears as townfolk.
 */
export interface AppearTownsfolkStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'appear-townsfolk';

  status?: DebuffStatus;
}

/**
 * Whether a player appears as outsider.
 */
export interface AppearOutsiderStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'appear-outsider';

  status?: DebuffStatus;
}

/**
 * Whether a player appears as minion.
 */
export interface AppearMinionStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'appear-minion';

  status?: DebuffStatus;
}

/**
 * Whether a player appears as demon.
 */
export interface AppearDemonStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'appear-demon';

  status?: DebuffStatus;
}

/**
 * The ability to vote.
 */
export interface AbleVoterStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'able-voter';

  status?: BooleanAbilityRule;
}

/**
 * The ability to nominate.
 */
export interface AbleNominatorStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'able-nominator';

  status?: BooleanAbilityRule;
}

/**
 * The ability to speak.
 */
export interface MutedStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'muted';

  status?: BooleanAbilityRule;
}

/**
 * The ability to speak.
 */
export interface WhisperStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'whisper';

  status?: WhisperDebuffStatus;
}

/**
 * How much power a players vote has.
 */
export interface VotingPowerStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'voting-power';

  status?: NumericAbilityRule;
}

/**
 * Whether a player sleeps past their night ability.
 */
export interface SleepyStatusAbilityRule extends StatusChangeAbilityRule {
  debuff: 'sleepy';

  status?: DebuffStatus;
}

/**
 * How to handle visibility if perception is changed.
 */
export type PercievedVisibility = 'maintain' | 'reveal' | 'cloak';

/**
 * Alters how characters are percieved by others.
 */
export interface PercievedAbilityRule extends AbilityRule {
  type: 'perception';

  /**
   * What aspect to percieve differently.
   */
  aspect: string;

  /**
   * Player being percieved.
   */
  who: PlayerAbilityRule;

  /**
   * Who this changes the perception of.
   */
  to: PlayerAbilityRule | PlayersAbilityRule;

  /**
   * Whether 
   */
  visibility: PercievedVisibility;
}

/**
 * Alters the percieved character a player registers as.
 */
export interface PercievedCharacterAbilityRule extends PercievedAbilityRule {
  aspect: 'character';

  character: CharacterData;
}

/**
 * Alters the percieved class a player registers as.
 */
export interface PercievedClassAbilityRule extends PercievedAbilityRule {
  aspect: 'class';

  class: CharacterClassAbilityRule;
}

/**
 * Alters the percieved alignment a player registers as.
 */
export interface PercievedAlignmentAbilityRule extends PercievedAbilityRule {
  aspect: 'alignment';

  alignment: AlignmentAbilityRule;
}
