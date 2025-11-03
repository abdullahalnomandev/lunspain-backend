export enum REPEAT_TYPE {
  NONE = "none",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export enum DAY_OF_WEEK {
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
  SUNDAY = "sunday",
}

export enum REPEAT_UNTIL {
  FOREVER = "forever",
  UNTIL_DATE = "until_date",
  AFTER_OCCURRENCES = "after_occurrences",
}

export enum CLASS_ROLE {
    USER = 'user',
    CLASS_LEADER = 'class_leader'
}

export enum CLASS_STATUS {
    AVAILABLE = 'available',
    CLOSED = 'closed'
}

export enum MEMBERS_STATUS {
    ATTEND = 'attend',
    WAIT = 'wait',
    CANCEL = 'cancel',
    LEADER = 'leader'
}
