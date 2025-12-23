#!/usr/bin/env node
/**
 * Upload files to Cloudflare R2 using S3-compatible API
 * 
 * Prerequisites:
 * 1. Install dependencies: npm install @aws-sdk/client-s3
 * 2. Set environment variables (all required):
 *    - R2_ACCESS_KEY_ID (get from Cloudflare Dashboard > R2 > Manage R2 API Tokens)
 *    - R2_SECRET_ACCESS_KEY (get from Cloudflare Dashboard > R2 > Manage R2 API Tokens)
 *    - R2_ACCOUNT_ID (get from Cloudflare Dashboard > Right sidebar)
 *    - R2_BUCKET_NAME (optional, defaults to: 360-artist-assets)
 * 3. Run: node upload-to-r2.js
 */

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

// Check for required credentials
if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    console.error('❌ Error: R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY must be set');
    console.error('');
    console.error('Get your R2 API tokens from:');
    console.error('Cloudflare Dashboard > R2 > Manage R2 API Tokens');
    console.error('');
    console.error('Set environment variables:');
    console.error('  export R2_ACCESS_KEY_ID="your-access-key-id"');
    console.error('  export R2_SECRET_ACCESS_KEY="your-secret-access-key"');
    console.error('  export R2_ACCOUNT_ID="your-account-id"  # Required');
    console.error('  export R2_BUCKET_NAME="360-artist-assets"  # Optional');
    process.exit(1);
}

// Check for account ID
if (!process.env.R2_ACCOUNT_ID) {
    console.error('❌ Error: R2_ACCOUNT_ID must be set');
    console.error('');
    console.error('Get your Account ID from:');
    console.error('Cloudflare Dashboard > Right sidebar (under your account name)');
    console.error('');
    console.error('Set environment variable:');
    console.error('  export R2_ACCOUNT_ID="your-account-id"');
    process.exit(1);
}

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const BUCKET_NAME = process.env.R2_BUCKET_NAME || '360-artist-assets';
const ENDPOINT = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;

const s3Client = new S3Client({
    region: 'auto',
    endpoint: ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

async function uploadFile(localPath, r2Key) {
    try {
        const fileContent = fs.readFileSync(localPath);
        const contentType = getContentType(localPath);
        
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: r2Key,
            Body: fileContent,
            ContentType: contentType,
        });
        
        await s3Client.send(command);
        return true;
    } catch (error) {
        console.error(`  ❌ Error uploading ${r2Key}:`, error.message);
        return false;
    }
}

function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const types = {
        '.pdf': 'application/pdf',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.webp': 'image/webp',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };
    return types[ext] || 'application/octet-stream';
}

async function uploadDirectory(localDir, r2Prefix) {
    const files = fs.readdirSync(localDir, { withFileTypes: true });
    let uploaded = 0;
    let failed = 0;
    
    for (const file of files) {
        const localPath = path.join(localDir, file.name);
        const r2Key = path.join(r2Prefix, file.name).replace(/\\/g, '/');
        
        if (file.isDirectory()) {
            const result = await uploadDirectory(localPath, r2Key);
            uploaded += result.uploaded;
            failed += result.failed;
        } else if (file.isFile()) {
            process.stdout.write(`  → ${file.name}... `);
            const success = await uploadFile(localPath, r2Key);
            if (success) {
                console.log('✅');
                uploaded++;
            } else {
                failed++;
            }
        }
    }
    
    return { uploaded, failed };
}

async function main() {
    console.log('🚀 Starting R2 upload');
    console.log(`   Bucket: ${BUCKET_NAME}`);
    console.log(`   Account: ${ACCOUNT_ID}`);
    console.log('');
    
    let totalUploaded = 0;
    let totalFailed = 0;
    
    // Upload Course Material PDF
    if (fs.existsSync('Course Material PDF')) {
        console.log('📁 Uploading Course Material PDF...');
        const result = await uploadDirectory('Course Material PDF', 'Course Material PDF');
        totalUploaded += result.uploaded;
        totalFailed += result.failed;
        console.log(`   ✅ ${result.uploaded} files uploaded`);
        if (result.failed > 0) {
            console.log(`   ❌ ${result.failed} files failed`);
        }
        console.log('');
    }
    
    // Upload assets/downloads
    if (fs.existsSync('assets/downloads')) {
        console.log('📁 Uploading assets/downloads...');
        const result = await uploadDirectory('assets/downloads', 'downloads');
        totalUploaded += result.uploaded;
        totalFailed += result.failed;
        console.log(`   ✅ ${result.uploaded} files uploaded`);
        if (result.failed > 0) {
            console.log(`   ❌ ${result.failed} files failed`);
        }
        console.log('');
    }
    
    console.log('✅ Upload complete!');
    console.log(`   Total: ${totalUploaded} uploaded, ${totalFailed} failed`);
    console.log('');
    console.log('Next steps:');
    console.log('1. Verify files in Cloudflare Dashboard > R2 >', BUCKET_NAME);
    console.log('2. Update HTML references to use /r2/ or /downloads/ paths');
}

main().catch(console.error);

