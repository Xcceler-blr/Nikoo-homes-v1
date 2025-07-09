import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the zip file
const createFloorPlansZip = async () => {
  const output = fs.createWriteStream(path.join(__dirname, '../public/floor-plan/all-plans.zip'));
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level
  });

  // Listen for all archive data to be written
  output.on('close', () => {
    console.log('Floor plans zip created successfully!');
    console.log('Total size: ' + archive.pointer() + ' bytes');
  });

  // Good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.warn('Warning:', err);
    } else {
      throw err;
    }
  });

  // Good practice to catch this error explicitly
  archive.on('error', (err) => {
    throw err;
  });

  // Pipe archive data to the file
  archive.pipe(output);

  // Add all floor plan files from assets
  const floorPlanFiles = [
    'studio .png',
    '1bhk.png',
    '1.5bhk.png',
    '2bhk.png',
    '2.5bhk.png',
    '3bhk.png',
    '3.5bhk.png',
    '3 Bed Loft.png',
    '4bhk.png'
  ];

  const assetsDir = path.join(__dirname, '../src/assets');

  for (const file of floorPlanFiles) {
    const filePath = path.join(assetsDir, file);
    if (fs.existsSync(filePath)) {
      // Clean the filename for the zip (remove spaces and special characters)
      const cleanName = file.replace(/\s+/g, '').replace(/\./g, '');
      archive.file(filePath, { name: `${cleanName}.png` });
      console.log(`Added ${file} as ${cleanName}.png`);
    } else {
      console.warn(`File not found: ${filePath}`);
    }
  }

  // Finalize the archive
  await archive.finalize();
};

// Run the script
createFloorPlansZip().catch(console.error); 