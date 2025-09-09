# BBLog - A Better BetterLog

A comprehensive Google Apps Script logging library that provides advanced logging capabilities with multiple output destinations and detailed configuration options.
Script ID: 1RHMscVSeGBkUHNw3_Qk929lDRC21Uw5_5e8G5j9a_CXKiwzoOLL-uPEM

## Features

- **Multiple Log Levels**: SEVERE, WARNING, INFO, CONFIG, FINE, FINER, FINEST
- **Multiple Destinations**: Log to Google Sheets, Firebase, Console, or StackDriver
- **User Identification**: Automatically log user email or user key
- **Function Tracing**: Optional automatic function name logging
- **Log Rotation**: Automatic log sheet rollover when size limits are reached
- **Backup Support**: Automatic backup of old logs to specified folders
- **Conditional Formatting**: Color-coded log entries in Google Sheets
- **Thread Safety**: Uses LockService for concurrent access protection

## Installation

1. In your Google Apps Script project, go to **Libraries** in the left sidebar
2. Add this library using the Script ID: `[YOUR_SCRIPT_ID_HERE]`
3. Select the latest version and save
4. Add the library identifier: `BBLog` (or your preferred identifier)

## Basic Usage

### Simple Logging

```javascript
// Basic setup - logs to active spreadsheet
const log = BBLog.getLog()
log.info('Application started')
log.warning('This is a warning message')
log.severe('Critical error occurred')
```

### Advanced Configuration

```javascript
const log = BBLog.getLog({
  sheetName: 'Application Log',
  level: BBLog.Level.FINEST,
  sheetId: '1ABC123...', // Specific spreadsheet ID
  displayUserId: BBLog.DisplayUserId.EMAIL_FULL,
  displayFunctionNames: BBLog.DisplayFunctionNames.YES,
  maxRows: 10000,
  hideLog: true
})

log.info('Detailed logging enabled')
```

## Configuration Options

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `level` | BBLog.Level | Minimum log level to display | Level.INFO |
| `sheetId` | string | Google Sheets ID for logging | Active spreadsheet |
| `sheetName` | string | Sheet name for logs | 'Log' |
| `displayUserId` | DisplayUserId | User identification format | NONE |
| `displayFunctionNames` | boolean | Show calling function names | false |
| `maxRows` | number | Max rows before log rollover | 50000 |
| `rollerRowCount` | number | Check frequency for rollover | 100 |
| `hideLog` | boolean | Hide the log sheet | false |
| `backupFolderId` | string | Drive folder for old logs | null |
| `useStackdriver` | boolean | Log to StackDriver | true |

## Log Levels

```javascript
// Available log levels (highest to lowest priority)
BBLog.Level.SEVERE    // Critical errors
BBLog.Level.WARNING   // Warning conditions  
BBLog.Level.INFO      // Informational messages
BBLog.Level.CONFIG    // Configuration info
BBLog.Level.FINE      // Debug info
BBLog.Level.FINER     // Detailed debug info
BBLog.Level.FINEST    // Most detailed tracing
```

## User ID Display Options

```javascript
// User identification options
BBLog.DisplayUserId.EMAIL_FULL    // user@domain.com
BBLog.DisplayUserId.EMAIL_HIDE    // u...r@domain.com
BBLog.DisplayUserId.USER_KEY_FULL // Full user key
BBLog.DisplayUserId.USER_KEY_HIDE // ...last15chars
BBLog.DisplayUserId.NONE          // No user ID
```

## Advanced Examples

### Error Handling with Logging

```javascript
function processData() {
  const log = BBLog.getLog({
    sheetName: 'Error Log',
    level: BBLog.Level.FINEST,
    displayUserId: BBLog.DisplayUserId.EMAIL_HIDE
  })
  
  try {
    log.info('Starting data processing')
    // Your code here
    log.info('Data processing completed successfully')
  } catch (error) {
    log.severe('Error in processData: ' + error.message)
    log.severe('Stack trace: ' + error.stack)
    throw error
  }
}
```

### Global Logging Function

```javascript
// Create a reusable logging function
function logIt(info) {
  const log = BBLog.getLog({
    sheetName: 'Application Log',
    level: BBLog.Level.FINEST,
    sheetId: '1ABC123...',
    displayUserId: BBLog.DisplayUserId.EMAIL_FULL
  })
  
  log[info.level](info.message)
  
  if (info.error) {
    log.severe(info.error.stack)
  }
}

// Usage throughout your application
try {
  // Your code here
} catch (error) {
  logIt({
    level: 'severe',
    message: 'Function failed: ' + error.message,
    error: error
  })
}
```

### Log Management

```javascript
const log = BBLog.getLog()

// Clear all log entries
log.clear()

// Get current log level
const currentLevel = log.getLevel()
console.log('Current level:', currentLevel.name)

// Change log level dynamically
log.setLevel(BBLog.Level.WARNING)
```

## Log Output Format

Logs are formatted as:
```
YYYY-MM-DD HH:mm:ss:SSS Z ElapsedTime UserID LogLevel FunctionName Message
```

Example:
```
2024-01-15 10:30:45:123 -0500 001234 user@domain.com INFO processData() Application started
```

## Required OAuth Scopes

For full functionality, add these scopes to your `appsscript.json`:

```json
{
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/script.external_request"
  ]
}
```

## Best Practices

1. **Set Appropriate Log Levels**: Use FINEST for development, INFO for production
2. **Use Structured Logging**: Include context and relevant data in log messages
3. **Handle Sensitive Data**: Be careful not to log passwords or personal information
4. **Monitor Log Size**: Configure appropriate `maxRows` and backup settings
5. **Use Consistent Formatting**: Establish logging patterns across your application

## Performance Considerations

- Function name detection uses stack traces, which can impact performance
- Consider disabling `displayFunctionNames` in production for better performance
- Log rotation happens automatically but can cause brief delays during rollover
- Use appropriate log levels to avoid excessive logging overhead

## Troubleshooting

### Common Issues

- **Permission Errors**: Ensure all required OAuth scopes are included
- **Sheet Not Found**: Verify spreadsheet ID and sheet name are correct
- **Lock Timeouts**: May occur during high-volume logging or sheet operations

### Debug Mode

Enable detailed logging to troubleshoot issues:

```javascript
const log = BBLog.getLog({
  level: BBLog.Level.FINEST,
  displayFunctionNames: BBLog.DisplayFunctionNames.YES
})
```

## License

Licensed under the Apache License, Version 2.0. Based on the original BetterLog library.

## Support

For issues, feature requests, or questions, please refer to the library documentation or contact the maintainer.
