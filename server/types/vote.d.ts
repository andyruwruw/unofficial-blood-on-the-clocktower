// Local Imports
import {
  AbilityRule,
  AbilityRuleReference,
} from './abilities';
import {
  PlayerAbilityRule,
  PlayersAbilityRule,
} from './players';
import { TargetableAbilityRule } from './actions';
import { CharacterAbilityRule } from './characters';
import { ExecutionAbilityRule } from './kills';
import { DayAbilityRule } from './events';
import { BooleanAbilityRule } from './primitives';

/**
 * Resolves to an nomination.
 */
export interface NominationAbilityRule extends AbilityRule {
  type: 'nomination';
}

/**
 * Resolves to an nomination.
 */
export interface NominationsAbilityRule extends AbilityRule {
  type: 'nomination-list';
}

/**
 * Resolves the first nomination made.
 */
export interface FirstNominationAbilityRule extends NominationAbilityRule {
  selector: 'first';
}

/**
 * Resolves the last nomination made.
 */
export interface LastNominationAbilityRule extends NominationAbilityRule {
  selector: 'last';
}

/**
 * Resolves the last nomination made.
 */
export interface DaysNominationsAbilityRule extends NominationsAbilityRule {
  day: DayAbilityRule;
}

/**
 * A vote object.
 */
export interface VoteAbilityRule extends AbilityRule {
  type: 'vote';
}

/**
 * Resolves to the voter of a vote.
 */
export interface VoterAbilityRule extends PlayerAbilityRule {
  selector: 'voter';

  /**
   * From what nomination.
   */
  context: VoteAbilityRule
    | AbilityRuleReference;
}

/**
 * Resolves to the nominator of an execution.
 */
export interface NominatorAbilityRule extends PlayerAbilityRule {
  selector: 'nominator';

  /**
   * From what nomination.
   */
  context: ExecutionAbilityRule
    | NominationAbilityRule
    | AbilityRuleReference;
}

/**
 * Resolves to the nominee of an execution.
 */
export interface NomineeAbilityRule extends PlayerAbilityRule {
  selector: 'nominee';

  /**
   * From what nomination.
   */
  context: ExecutionAbilityRule
    | NominationAbilityRule
    | AbilityRuleReference;
}


/**
 * Resolves to a list of all those who voted for an execution.
 */
export interface VotersAbilityRuleValue extends PlayersAbilityRule {
  selector: 'voters';

  /**
   * Voters for what context.
   */
  context: ExecutionAbilityRule
  | NominationAbilityRule
  | AbilityRuleReference;
}

/**
 * A user's death token.
 */
export interface DeathTokenStatusAbilityRule extends AbilityRule {
  type: 'death-token';

  /**
   * Who owns the token now.
   */
  owner?: PlayerAbilityRule;

  /**
   * Who the token belonged too.
   */
  creator?: PlayerAbilityRule;
}

/**
 * A user's death token.
 */
export interface DeathTokensStatusAbilityRule extends AbilityRule {
  type: 'death-tokens';

  /**
   * Who to find teh death tokens of.
   */
  context: PlayerAbilityRule
    | CharacterAbilityRule
    | AbilityRuleReference;
}

/**
 * Whether a player sleeps past their night ability.
 */
export interface GiveDeathTokenStatusAbilityRule extends TargetableAbilityRule {
  type: 'give-death-token';
}

/**
 * Whether a player sleeps past their night ability.
 */
export interface TakeDeathTokenStatusAbilityRule extends TargetableAbilityRule {
  type: 'take-death-token';
}

/**
 * Determine if a vote was successful.
 */
export interface WasSuccessfulAbilityRule extends BooleanAbilityRule {
  query: 'was-successful';

  /**
   * From what nomination.
   */
  context: VoteAbilityRule
    | AbilityRuleReference;
}
