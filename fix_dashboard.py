
import os

file_path = r'c:\NeetAdmissionKolkata\client\src\pages\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# We want to remove lines 1066 to 1143 (0-indexed: 1065 to 1142)
# AND the redundant closing tags if they are there.
# Let's be very specific about what we remove based on content to be safe.

new_lines = []
skip = False
for i, line in enumerate(lines):
    # Line 1066 in view_file was lines[1065]
    if i >= 1065 and i <= 1142:
        continue
    new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
print("Updated Dashboard.jsx")
