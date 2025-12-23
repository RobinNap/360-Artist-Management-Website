#!/bin/bash
# Upload files to Cloudflare R2
# 
# Prerequisites:
# 1. Install wrangler: npm install -g wrangler
# 2. Login: wrangler login
# 3. Set environment variables (optional, wrangler will use your account):
#    export R2_BUCKET_NAME="360-artist-assets"
#    export R2_ACCOUNT_ID="your-account-id"

BUCKET_NAME="${R2_BUCKET_NAME:-360-artist-assets}"
ACCOUNT_ID="${R2_ACCOUNT_ID}"

if [ -z "$ACCOUNT_ID" ]; then
    echo "⚠️  R2_ACCOUNT_ID not set. Wrangler will use your logged-in account."
    echo "   To set explicitly: export R2_ACCOUNT_ID='your-account-id'"
    echo ""
    # Remove --account-id flag if not set
    ACCOUNT_FLAG=""
else
    ACCOUNT_FLAG="--account-id=$ACCOUNT_ID"
fi

echo "🚀 Starting R2 upload to bucket: $BUCKET_NAME"
echo ""

# Upload Course Material PDF files
echo "📁 Uploading Course Material PDF files..."
if [ -d "Course Material PDF" ]; then
    # Upload Assets folder
    if [ -d "Course Material PDF/Assets" ]; then
        echo "  Uploading Assets..."
        for file in "Course Material PDF/Assets"/*; do
            if [ -f "$file" ]; then
                filename=$(basename "$file")
                echo "    → $filename"
                wrangler r2 object put "$BUCKET_NAME/Course Material PDF/Assets/$filename" --file="$file" $ACCOUNT_FLAG
            fi
        done
    fi
    
    # Upload subdirectories
    for dir in "Course Material PDF"/*/; do
        if [ -d "$dir" ] && [ "$(basename "$dir")" != "Assets" ]; then
            dirname=$(basename "$dir")
            echo "  Uploading $dirname..."
            for file in "$dir"*; do
                if [ -f "$file" ]; then
                    filename=$(basename "$file")
                    echo "    → $filename"
                    wrangler r2 object put "$BUCKET_NAME/Course Material PDF/$dirname/$filename" --file="$file" $ACCOUNT_FLAG
                fi
            done
        fi
    done
else
    echo "  ⚠️  Course Material PDF directory not found"
fi

echo ""

# Upload assets/downloads files
echo "📁 Uploading assets/downloads files..."
if [ -d "assets/downloads" ]; then
    for file in "assets/downloads"/*; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            echo "  → $filename"
            wrangler r2 object put "$BUCKET_NAME/downloads/$filename" --file="$file" $ACCOUNT_FLAG
        fi
    done
else
    echo "  ⚠️  assets/downloads directory not found"
fi

echo ""
echo "✅ Upload complete!"
echo ""
echo "Next steps:"
echo "1. Verify files in Cloudflare Dashboard > R2 > $BUCKET_NAME"
echo "2. Update HTML references to use /r2/ or /downloads/ paths"
echo "3. Test file access"

