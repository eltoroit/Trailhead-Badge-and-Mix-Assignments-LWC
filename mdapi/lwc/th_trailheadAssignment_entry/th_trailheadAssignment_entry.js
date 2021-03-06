/**
 * Represents an entry in the list of trailhead assignments.
 */
import { LightningElement, track, api } from 'lwc';

//-- note: custom labels are currently supported in LWC - Custom Settings require an apex callout
//-- because this is an organization wide value, the choice was made to use custom labels instead

/** The default address to show for a trail */
import TRAILHEAD_TRAIL_ICON from '@salesforce/label/c.th_trailhead_trail_icon';

/** The TrailMix entry type */
import ENTRY_TYPE_TRAILMIX from '@salesforce/label/c.th_TrailheadTypeTrailmix';

/** The standard event status */
const STATUS_STANDARD = 'event-standard';
/** The event is now due */
const STATUS_DUE = 'event-due';
/** The event is considered 'upcoming' */
const STATUS_UPCOMING = 'event-upcoming';

/** milliseconds per day */
// const MILLI_PER_DAY = 24 * 60 * 60 * 1000;

export default class Th_trailheadAssignment_entry extends LightningElement {

  /** the assignment */
  @api assignmentEntry;

  /** length of time until the upcoming event window is closed */
  @api upcomingEventWindow;

  /** called on initial creation */
  connectedCallback(){
    if (!this.assignmentEntry){
      this.assignmentEntry = {};
    }
  }

  /** url for the icon to show */
  @api
  get iconURL(){
    let result = this.assignmentEntry.Icon;
    if (!result || this.assignmentEntry.EntryType === ENTRY_TYPE_TRAILMIX){
      result = TRAILHEAD_TRAIL_ICON
    }
    return result;
  }

  /** whether there is a due date assigned */
  @api
  get hasDueDate(){
    //-- move truthy evaluation here for clarity
    return this.assignmentEntry.DueDate ? true : false;
  }

  @api
  get statusClass(){
    let result = STATUS_STANDARD;

    let daysUntilDue = this.assignmentEntry.NumDaysUntilDue;
    if (daysUntilDue < 0){
      result = STATUS_DUE;
    } else if (daysUntilDue < this.upcomingEventWindow){
      result = STATUS_UPCOMING;
    }

    result += ' slds-p-left_xxx-small'

    return result;
  }
}