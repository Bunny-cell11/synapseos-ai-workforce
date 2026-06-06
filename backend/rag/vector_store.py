memory_store = []

def save_memory(text):

    memory_store.append(text)

def retrieve_memory(query):

    results = []

    for item in memory_store:

        if query.lower() in item.lower():

            results.append(item)

    return results