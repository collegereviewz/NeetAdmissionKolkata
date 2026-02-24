
import re

file_path = r'c:\NeetAdmissionKolkata\client\src\pages\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

stack = []
for i, line in enumerate(lines):
    line_num = i + 1
    # Find tags
    tags = re.findall(r'<(div|motion\.div|AnimatePresence)|</(div|motion\.div|AnimatePresence)>', line)
    for opening, closing in tags:
        if opening:
            if '/>' not in line or opening not in line.split('/>')[0]: # Very basic self-closing check
                 # Actually, let's just check if it's self closing in the same line
                 if opening == 'motion.div' and '/>' in line:
                     continue
                 stack.append((opening, line_num))
        elif closing:
            if stack:
                last_opening, last_line = stack.pop()
                if last_opening != closing:
                    print(f"Mismatched tag at line {line_num}: expected {last_opening} to close (opened at {last_line}), but found {closing}")
            else:
                print(f"Extra closing tag {closing} at line {line_num}")

for tag, line in stack:
    print(f"Unclosed tag {tag} opened at line {line}")
