class SecurityAgent:
    def execute(self, input_data):
        blocked_keywords = ["hack", "exploit"]

        for word in blocked_keywords:
            if word in input_data.lower():
                return {
                    "status": "Blocked",
                    "reason": "Potential malicious input detected"
                }

        return {
            "status": "Safe"
        }
