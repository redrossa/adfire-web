import { NextRequest, NextResponse } from 'next/server';
import { rm } from 'fs/promises';

function setDeepValue(obj: any, keys: string[], value: any) {
  let current = obj;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }
  });
}

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const files = data.getAll('files') as File[];

  const loadedPath = `${process.cwd()}/loaded`;
  if (files.length > 0) {
    await rm(loadedPath, { recursive: true, force: true });
  }

  const result = {};
  for (const file of files) {
    const recursiveName = file.name.split('/').slice(1);
    if (recursiveName[0] !== '.reports' && file.type !== 'application/json') {
      continue;
    }

    const keys = recursiveName.slice(1);
    keys[keys.length - 1] = keys[keys.length - 1].split('.')[0];
    const text = await file.text();
    const json = JSON.parse(text);

    setDeepValue(result, keys, json);
  }

  return NextResponse.json(result);
}