# Save the instruments in the asset folder since it will not change in a month--SKIPPED
   
```typescript
    http://api.kite.trade/instruments
```

# Prepare for the search String- SKIPPED

```typescript
use papaparse to read the csv file
```

# Copy the line that contains the Search String-- SKIPPED

```typescript
```

# Get the instrument ID from NSE: NIFTY - 478216

```typescript
```

# Create other search strings using the option chain table
# Find the fine cutoff point in specific direction
# If that trade does not pick up wait for the 1 min fall and take the other side trade and that entry becomes the cut off for both directions.
# Only a loss trade makes a profit trade.
# hunt for  loss trades.

```typescript
```

# Get the relavent data for running the logic in one place

```typescript
```

# Wait for 2 min to get the flex point

```typescript
```

# Make the first entry

```typescript
```

# Scan other instruments for Trigger

```typescript
```

# If triggered change direction and then check for about turn

```typescript
```

## Steps
# id1(Track 2 min NIFTY data along with CE PE ranges) 
# From the received NIFTY data get the CE PE data
```typescript
```
# id2(End of 2 nd min: Get the Direction and point)
```typescript
```
# id3(3rd min : Print the trade) 
```typescript
```
# id4(Wait for the trade to turn red)
```typescript
```
# id5(Exit loss trade and Save the triggers in both directions.) 
```typescript
```

## Working Code
