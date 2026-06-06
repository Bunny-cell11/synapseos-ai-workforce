async def process_file(file):

    content = await file.read()

    return {
        "filename": file.filename,
        "size": len(content),
        "status": "processed"
    }