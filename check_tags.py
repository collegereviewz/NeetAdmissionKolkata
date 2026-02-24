
import re

file_path = r'c:\NeetAdmissionKolkata\client\src\pages\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Very naive tag counter
opening_div = len(re.findall(r'<div', content))
closing_div = len(re.findall(r'</div', content))

opening_motion_div = len(re.findall(r'<motion.div', content))
closing_motion_div = len(re.findall(r'</motion.div', content))

opening_animate_presence = len(re.findall(r'<AnimatePresence', content))
closing_animate_presence = len(re.findall(r'</AnimatePresence', content))

opening_parens = content.count('(')
closing_parens = content.count(')')

opening_braces = content.count('{')
closing_braces = content.count('}')

print(f"div: {opening_div} / {closing_div}")
print(f"motion.div: {opening_motion_div} / {closing_motion_div}")
print(f"AnimatePresence: {opening_animate_presence} / {closing_animate_presence}")
print(f"Parens: {opening_parens} / {closing_parens}")
print(f"Braces: {opening_braces} / {closing_braces}")
