## Install F-Droid
# F-Droid is an installable catalogue of FOSS (Free and Open Source Software) applications for the Android platform

```typescript
    https://f-droid.org/packages/org.fdroid.fdroid/
```
## Update F-Droid
# F-Droid platform first need to be updated before trying to down load apps

```typescript
    Update F-Droid
```
## Dev Tools Search Termux and install
# Search for Termux in Dev Tools section and Download and install it

```typescript
    Termux application install and open it
```

## Change Repo
# Change the repo and select the preferred mirror

```typescript
    termux-change-repo
    as mentioned in https://github.com/termux/termux-packages/issues/6726
```

## Select Grimler Mirror
# This Mirror is selected as per the issue above

```typescript
    Grimler Mirror
```

## apt upgrade && apt update
# As soon as the mirror is changed upgrade and update the contents

```typescript
    apt upgrade && apt update
```

## pkg install nodejs
# Install nodejs packages with lts

```typescript
    pkg install nodejs
```

## apt install git
# Install git for downloading the code

```typescript
    apt install git
```

## apt install openssl-tool
# Oenssl is needed for running kiteconnect

```typescript
    apt install openssl-tool
```

## git clone Express Starter repo and install and run start
# Get the code from github and install and run node start

```typescript
    git clone https://github.com/gmanojisaac/ZerodhaSanity.git
    cd ZerodhaSanity
    npm install
    npm run start
```

## After cloning make github repo private
# To prevent the keys from being hacked