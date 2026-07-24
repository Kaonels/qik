#!/usr/bin/env python3
"""Merge cover.pdf (page 0) + body.pdf into final propuesta.pdf."""
import os
from pypdf import PdfReader, PdfWriter

A4_W, A4_H = 595.28, 841.89

def normalize_page_to_a4(page, force=False):
    box = page.mediabox
    w, h = float(box.width), float(box.height)
    if force or abs(w - A4_W) > 0.5 or abs(h - A4_H) > 0.5:
        page.scale_to(A4_W, A4_H)
        # Also normalize cropbox/trimbox/bleedbox/artbox if present
        for box_name in ('/CropBox', '/TrimBox', '/BleedBox', '/ArtBox'):
            try:
                page[box_name] = page.mediabox
            except Exception:
                pass
    return page

def merge(cover_pdf, body_pdf, output_pdf):
    writer = PdfWriter()
    # Cover (page 1) — force normalize to exact A4 dimensions
    cover_page = PdfReader(cover_pdf).pages[0]
    writer.add_page(normalize_page_to_a4(cover_page, force=True))
    # Body
    for page in PdfReader(body_pdf).pages:
        writer.add_page(normalize_page_to_a4(page))
    writer.add_metadata({
        '/Title': 'QIK AI COMMAND CENTER - Propuesta Ejecutiva',
        '/Author': 'Qik AI Command Center',
        '/Creator': 'Z.ai',
        '/Subject': 'Sistema de Inteligencia Artificial para el Banco Digital Qik',
        '/Keywords': 'Qik, AI, neobanco, Republica Dominicana, Banco Popular, '
                     'inteligencia ejecutiva, dashboard, agentes IA',
    })
    with open(output_pdf, 'wb') as f:
        writer.write(f)
    print(f"[ok] Merged final PDF: {output_pdf}")
    print(f"     Cover: {cover_pdf}")
    print(f"     Body:  {body_pdf}")
    return output_pdf

if __name__ == '__main__':
    base = '/home/z/my-project/scripts/pdf-build'
    cover = os.path.join(base, 'cover.pdf')
    body = os.path.join(base, 'body.pdf')
    out = os.path.join(base, 'qik-ai-command-center-propuesta.pdf')
    merge(cover, body, out)
    # Stats
    r = PdfReader(out)
    sz = os.path.getsize(out)
    print(f"     Pages: {len(r.pages)}")
    print(f"     Size: {sz/1024:.1f} KB")
