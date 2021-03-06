export type SettingCategory = 'MAIL' | 'GENERAL' | 'INVOICE_EU' | 'TRANSLATIONS' |
'PAYMENT' | 'PAYMENT_STRIPE' | 'IMPORT_ATTENDEE' | 'ALFIO_PI' |
'PAYMENT_MOLLIE' | 'RESERVATION_UI' | 'INVOICE' | 'PASS_INTEGRATION' |
'PAYMENT_PAYPAL' | 'WAITING_LIST' | 'MAP' | 'PAYMENT_OFFLINE';

export type ConfigurationPathLevel = 'SYSTEM' | 'ORGANIZATION' | 'EVENT' | 'TICKET_CATEGORY';

export type ComponentType = 'TEXT' | 'BOOLEAN' | 'LIST' | 'TEXTAREA';

export class ConfigurationKeyValue {
    id: number;
    key: string;
    value: string;
    description: string;
    configurationKey: ConfigurationKey;
    configurationPathLevel: ConfigurationPathLevel;
    basic: boolean;
    componentType: ComponentType;
}

export class ConfigurationModification {
    id: number;
    key: string;
    value: string;
}

//
export type ConfigurationKey =
'NOT_RECOGNIZED' |
'INIT_COMPLETED' |
'SUPPORTED_LANGUAGES' |
'BASE_URL' |
'MAPS_PROVIDER' |
'MAPS_CLIENT_API_KEY' |
'MAPS_HERE_API_KEY' |
'MAPS_HERE_APP_ID' | //<- deprecated
'MAPS_HERE_APP_CODE' | //<- deprecated
'RECAPTCHA_API_KEY' |
'RECAPTCHA_SECRET' |
'ENABLE_CAPTCHA_FOR_LOGIN' |
'DISPLAY_STATS_IN_EVENT_DETAIL' |
'DEMO_MODE_ACCOUNT_EXPIRATION_DAYS' |
'PLATFORM_MODE_ENABLED' |
'PLATFORM_FEE' |
'PLATFORM_FIXED_FEE' |
'PLATFORM_PERCENTAGE_FEE' |
'PLATFORM_MINIMUM_FEE' |
'PLATFORM_MAXIMUM_FEE' |
'PAYMENT_METHODS_BLACKLIST' |
'STRIPE_CC_ENABLED' |
'STRIPE_PUBLIC_KEY' |
'STRIPE_SECRET_KEY' |
'STRIPE_CONNECT_CLIENT_ID' |
'STRIPE_CONNECT_CALLBACK' |
'STRIPE_WEBHOOK_KEY' |
'STRIPE_WEBHOOK_PAYMENT_KEY' |
'STRIPE_CONNECTED_ID' |
'STRIPE_ENABLE_SCA' |
'SPECIAL_PRICE_CODE_LENGTH' |
'MAX_AMOUNT_OF_TICKETS_BY_RESERVATION' |
'ASSIGNMENT_REMINDER_START' |
'ASSIGNMENT_REMINDER_INTERVAL' |
'OPTIONAL_DATA_REMINDER_ENABLED' |
'RESERVATION_TIMEOUT' |
'RESERVATION_MIN_TIMEOUT_AFTER_FAILED_PAYMENT' |
'NOTIFY_ALL_FAILED_PAYMENT_ATTEMPTS' |
'DISPLAY_TICKETS_LEFT_INDICATOR' |
'ENABLE_CAPTCHA_FOR_TICKET_SELECTION' |
'DISPLAY_EXPIRED_CATEGORIES' |
'DISPLAY_DISCOUNT_CODE_BOX' |
'USE_PARTNER_CODE_INSTEAD_OF_PROMOTIONAL' |
'ENABLE_CUSTOMER_REFERENCE' |
'ENABLE_ATTENDEE_AUTOCOMPLETE' |
'FORCE_TICKET_OWNER_ASSIGNMENT_AT_RESERVATION' |
'SEND_TICKETS_AUTOMATICALLY' |
'ENABLE_TICKET_TRANSFER' |
'ALLOW_FREE_TICKETS_CANCELLATION' |
//
'MAILER_TYPE' |
//
'MAX_EMAIL_PER_CYCLE' |
'MAIL_REPLY_TO' |
'MAIL_SYSTEM_NOTIFICATION_CC' |
//smtp configuration related keys
'SMTP_HOST' |
'SMTP_PORT' |
'SMTP_PROTOCOL' |
'SMTP_USERNAME' |
'SMTP_PASSWORD' |
'SMTP_FROM_EMAIL' |
'SMTP_PROPERTIES' |
'BANK_TRANSFER_ENABLED' |
'OFFLINE_PAYMENT_DAYS' |
'OFFLINE_REMINDER_HOURS' |
'ENABLE_CAPTCHA_FOR_OFFLINE_PAYMENTS' |
'BANK_ACCOUNT_NR' |
'BANK_ACCOUNT_OWNER' |
'AUTOMATIC_REMOVAL_EXPIRED_OFFLINE_PAYMENT' |
'PARTIAL_RESERVATION_ID_LENGTH' |
'REVOLUT_ENABLED' |
'REVOLUT_MANUAL_REVIEW' |
'REVOLUT_LIVE_MODE' |
'REVOLUT_API_KEY' |
//
//mailgun configuration related info
'MAILGUN_KEY' |
'MAILGUN_DOMAIN' |
'MAILGUN_FROM' |
'MAILGUN_EU' |
// sendgrid related config
'SENDGRID_API_KEY' |
'SENDGRID_FROM' |
// mailjet
'MAILJET_APIKEY_PUBLIC' |
'MAILJET_APIKEY_PRIVATE' |
'MAILJET_FROM' |
//
'GOOGLE_ANALYTICS_KEY' |
'GOOGLE_ANALYTICS_ANONYMOUS_MODE' |
'ENABLE_WAITING_QUEUE' |
'ENABLE_PRE_REGISTRATION' |
'ENABLE_WAITING_QUEUE_NOTIFICATION' |
'WAITING_QUEUE_RESERVATION_TIMEOUT' |
'STOP_WAITING_QUEUE_SUBSCRIPTIONS' |
//
'MAIL_ATTEMPTS_COUNT' |
//
'PAYPAL_ENABLED' |
'PAYPAL_CLIENT_ID' |
'PAYPAL_CLIENT_SECRET' |
'PAYPAL_LIVE_MODE' |
'PAYPAL_DEMO_MODE_USERNAME' |
'PAYPAL_DEMO_MODE_PASSWORD' |
//
//
'MOLLIE_API_KEY' |
'MOLLIE_CC_ENABLED' |
//
'ON_SITE_ENABLED' |
'SEND_TICKETS_AFTER_IMPORT_ATTENDEE' |
'CREATE_RESERVATION_FOR_EACH_IMPORTED_ATTENDEE' |
//
'VAT_NR' |
'INVOICE_NUMBER_PATTERN' |
'INVOICE_ADDRESS' |
'USE_INVOICE_NUMBER_AS_ID' |
'VAT_NUMBER_IS_REQUIRED' |
'GENERATE_ONLY_INVOICE' |
'ENABLE_ITALY_E_INVOICING' |
'ENABLE_EU_VAT_DIRECTIVE' |
'ENABLE_VIES_VALIDATION' |
'APPLY_VAT_FOREIGN_BUSINESS' |
'COUNTRY_OF_BUSINESS' |
'EU_COUNTRIES_LIST' |
'EU_VAT_API_ADDRESS' |
//
//PASSBOOK
'ENABLE_PASS' |
'PASSBOOK_TYPE_IDENTIFIER' |
'PASSBOOK_TEAM_IDENTIFIER' |
'PASSBOOK_KEYSTORE' |
'PASSBOOK_KEYSTORE_PASSWORD' |
'PASSBOOK_PRIVATE_KEY_ALIAS' |
//CHECK-IN
'CHECK_IN_STATS' |
//ALF.IO-PI
'ALFIO_PI_INTEGRATION_ENABLED' |
'OFFLINE_CHECKIN_ENABLED' |
'LABEL_PRINTING_ENABLED' |
'LABEL_LAYOUT' |
'CHECK_IN_COLOR_CONFIGURATION' |
//
//
'SECURITY_CSP_REPORT_ENABLED' |
'SECURITY_CSP_REPORT_URI' |
//
'TRANSLATION_OVERRIDE';