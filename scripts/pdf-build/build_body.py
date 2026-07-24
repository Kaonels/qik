#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
QIK AI COMMAND CENTER — Propuesta Ejecutiva
Body PDF (ReportLab + TocDocTemplate).

The cover is rendered separately via html2poster.js and merged via pypdf.
This script generates ONLY the body content (TOC + 12 chapters).
"""

import os
import sys
import hashlib
import platform

# --- Skill path setup ---
PDF_SKILL_DIR = "/home/z/my-project/skills/pdf"
_scripts = os.path.join(PDF_SKILL_DIR, "scripts")
if _scripts not in sys.path:
    sys.path.insert(0, _scripts)

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, mm, cm
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, CondPageBreak, HRFlowable, Image, Flowable
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfgen import canvas

# --- Font registration ---
_IS_MAC = platform.system() == 'Darwin'
if _IS_MAC:
    FONT_DIR = os.path.expanduser('~/.openclaw/workspace/fonts')
else:
    FONT_DIR = '/usr/share/fonts'

pdfmetrics.registerFont(TTFont('FreeSerif', f'{FONT_DIR}/truetype/freefont/FreeSerif.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Bold', f'{FONT_DIR}/truetype/freefont/FreeSerifBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Italic', f'{FONT_DIR}/truetype/freefont/FreeSerifItalic.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-BoldItalic', f'{FONT_DIR}/truetype/freefont/FreeSerifBoldItalic.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', f'{FONT_DIR}/truetype/dejavu/DejaVuSansMono.ttf'))

registerFontFamily('FreeSerif',
                   normal='FreeSerif',
                   bold='FreeSerif-Bold',
                   italic='FreeSerif-Italic',
                   boldItalic='FreeSerif-BoldItalic')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')

# Install font fallback for any missing glyphs
try:
    from pdf import install_font_fallback
    install_font_fallback()
except Exception as _e:
    print(f"[warn] install_font_fallback unavailable: {_e}")

# --- Qik dashboard palette (matches the live dashboard exactly) ---
# Dark cover palette is applied in cover.html. Body uses a clean light palette
# harmonized with the cover accents (emerald + cyan + violet).

# XL tier: page backgrounds (clean white for readability)
PAGE_BG       = colors.HexColor('#ffffff')
SECTION_BG    = colors.HexColor('#f8fafc')   # very light slate

# L tier: surfaces
CARD_BG       = colors.HexColor('#f1f5f9')   # light slate
TABLE_STRIPE  = colors.HexColor('#f8fafc')   # subtle stripe

# M tier: structural fills — deep slate-teal anchors page to cover
HEADER_FILL   = colors.HexColor('#0f172a')   # slate-900 — anchors body to dark cover
COVER_BLOCK   = colors.HexColor('#1e293b')   # slate-800

# S tier: edges & icons
BORDER        = colors.HexColor('#cbd5e1')   # slate-300
ICON          = colors.HexColor('#475569')   # slate-600

# XS tier: emphasis — Qik dashboard accents
ACCENT        = colors.HexColor('#10b981')   # emerald (primary)
ACCENT_2      = colors.HexColor('#22d3ee')   # cyan
ACCENT_3      = colors.HexColor('#8b5cf6')   # violet
ACCENT_AMBER  = colors.HexColor('#fbbf24')   # amber
ACCENT_RED    = colors.HexColor('#f43f5e')   # red
ACCENT_GOLD   = colors.HexColor('#facc15')   # gold

# Typography
TEXT_PRIMARY  = colors.HexColor('#0f172a')   # slate-900 (body)
TEXT_MUTED    = colors.HexColor('#64748b')   # slate-500

# Semantic (low-sat for body)
SEM_SUCCESS   = colors.HexColor('#10b981')
SEM_WARNING   = colors.HexColor('#f59e0b')
SEM_ERROR     = colors.HexColor('#ef4444')
SEM_INFO      = colors.HexColor('#3b82f6')

# Table colors (derived from cascade tiers)
TABLE_HEADER_COLOR = HEADER_FILL
TABLE_HEADER_TEXT  = colors.white
TABLE_ROW_EVEN     = colors.white
TABLE_ROW_ODD      = TABLE_STRIPE


# ---------- Page geometry ----------
PAGE_W, PAGE_H = A4
LEFT_MARGIN   = 0.85 * inch
RIGHT_MARGIN  = 0.85 * inch
TOP_MARGIN    = 0.95 * inch
BOTTOM_MARGIN = 0.85 * inch
CONTENT_W = PAGE_W - LEFT_MARGIN - RIGHT_MARGIN


# ---------- Styles ----------
def _style(name, **kwargs):
    base = dict(name=name, fontName='FreeSerif', fontSize=10.5, leading=15,
                textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY)
    base.update(kwargs)
    return ParagraphStyle(**base)


STY_H1 = _style('H1', fontName='FreeSerif-Bold', fontSize=22, leading=27,
                textColor=HEADER_FILL, alignment=TA_LEFT, spaceBefore=8, spaceAfter=10)
STY_H1_NUM = _style('H1Num', fontName='FreeSerif-Bold', fontSize=10, leading=14,
                    textColor=ACCENT, alignment=TA_LEFT, spaceBefore=0, spaceAfter=4)
STY_H2 = _style('H2', fontName='FreeSerif-Bold', fontSize=15, leading=20,
                textColor=HEADER_FILL, alignment=TA_LEFT, spaceBefore=14, spaceAfter=6)
STY_H3 = _style('H3', fontName='FreeSerif-Bold', fontSize=12, leading=16,
                textColor=ACCENT, alignment=TA_LEFT, spaceBefore=10, spaceAfter=4)
STY_BODY = _style('Body', fontSize=10.5, leading=15.5, alignment=TA_JUSTIFY,
                  spaceAfter=6)
STY_BODY_LEFT = _style('BodyLeft', fontSize=10.5, leading=15.5, alignment=TA_LEFT,
                       spaceAfter=6)
STY_LEAD = _style('Lead', fontSize=12, leading=18, alignment=TA_JUSTIFY,
                  textColor=TEXT_PRIMARY, spaceAfter=8)
STY_BULLET = _style('Bullet', fontSize=10.5, leading=15, alignment=TA_LEFT,
                    leftIndent=18, firstLineIndent=-12, spaceAfter=3)
STY_CAPTION = _style('Caption', fontSize=9, leading=12, alignment=TA_CENTER,
                     textColor=TEXT_MUTED, spaceBefore=4, spaceAfter=12, fontName='FreeSerif-Italic')
STY_CALLOUT_NUM = _style('CalloutNum', fontName='FreeSerif-Bold', fontSize=22,
                         leading=26, textColor=ACCENT, alignment=TA_CENTER)
STY_CALLOUT_LBL = _style('CalloutLbl', fontSize=8.5, leading=11,
                         textColor=TEXT_MUTED, alignment=TA_CENTER)
STY_DISCLAIMER = _style('Disclaimer', fontSize=9, leading=12.5, alignment=TA_JUSTIFY,
                        textColor=TEXT_MUTED, fontName='FreeSerif-Italic', spaceBefore=6, spaceAfter=10)
STY_QUOTE = _style('Quote', fontSize=12.5, leading=18, alignment=TA_LEFT,
                   textColor=HEADER_FILL, fontName='FreeSerif-Italic',
                   leftIndent=20, rightIndent=20, spaceBefore=10, spaceAfter=14)
STY_TBL_HEAD = _style('TblHead', fontName='FreeSerif-Bold', fontSize=9.5, leading=12,
                      textColor=colors.white, alignment=TA_CENTER)
STY_TBL_CELL = _style('TblCell', fontSize=9, leading=12, alignment=TA_LEFT)
STY_TBL_CELL_C = _style('TblCellC', fontSize=9, leading=12, alignment=TA_CENTER)
STY_TBL_CELL_R = _style('TblCellR', fontSize=9, leading=12, alignment=TA_RIGHT)
STY_TBL_CELL_NUM = _style('TblCellNum', fontSize=9, leading=12, alignment=TA_RIGHT,
                          fontName='FreeSerif-Bold', textColor=HEADER_FILL)
STY_TOC_TITLE = _style('TocTitle', fontName='FreeSerif-Bold', fontSize=22, leading=26,
                       textColor=HEADER_FILL, alignment=TA_LEFT, spaceAfter=10)
STY_AGENT_NAME = _style('AgentName', fontName='FreeSerif-Bold', fontSize=11,
                        leading=14, textColor=HEADER_FILL, alignment=TA_LEFT)
STY_AGENT_LABEL = _style('AgentLabel', fontName='FreeSerif-Bold', fontSize=8.5,
                         leading=11, textColor=ACCENT, alignment=TA_LEFT)
STY_AGENT_VAL = _style('AgentVal', fontSize=9.5, leading=12.5, alignment=TA_LEFT,
                       textColor=TEXT_PRIMARY)
STY_AGENT_MUTED = _style('AgentMuted', fontSize=9, leading=12, alignment=TA_LEFT,
                         textColor=TEXT_MUTED)


# ---------- TocDocTemplate with header/footer ----------
class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))


# Page header/footer
HEADER_TITLE = "QIK AI COMMAND CENTER"
FOOTER_LEFT = "Qik · República Dominicana · 2025"
FOOTER_RIGHT = "Propuesta Ejecutiva"


def draw_header_footer(canv: canvas.Canvas, doc):
    canv.saveState()
    # Header rule (emerald)
    canv.setStrokeColor(ACCENT)
    canv.setLineWidth(1.4)
    canv.line(LEFT_MARGIN, PAGE_H - 0.55 * inch,
              PAGE_W - RIGHT_MARGIN, PAGE_H - 0.55 * inch)
    # Header title (left, dark)
    canv.setFont('FreeSerif-Bold', 8)
    canv.setFillColor(HEADER_FILL)
    canv.drawString(LEFT_MARGIN, PAGE_H - 0.45 * inch, HEADER_TITLE)
    # Header subtitle (right, muted)
    canv.setFont('FreeSerif-Italic', 8)
    canv.setFillColor(TEXT_MUTED)
    canv.drawRightString(PAGE_W - RIGHT_MARGIN, PAGE_H - 0.45 * inch,
                         "Propuesta Ejecutiva · Qik")

    # Footer rule (light gray)
    canv.setStrokeColor(BORDER)
    canv.setLineWidth(0.5)
    canv.line(LEFT_MARGIN, 0.55 * inch, PAGE_W - RIGHT_MARGIN, 0.55 * inch)
    # Footer left (muted)
    canv.setFont('FreeSerif', 8)
    canv.setFillColor(TEXT_MUTED)
    canv.drawString(LEFT_MARGIN, 0.40 * inch, FOOTER_LEFT)
    # Footer center (page number)
    page_num = canv.getPageNumber()
    page_str = f"Página {page_num}"
    canv.setFont('FreeSerif-Bold', 8.5)
    canv.setFillColor(HEADER_FILL)
    canv.drawCentredString(PAGE_W / 2.0, 0.40 * inch, page_str)
    # Footer right (muted)
    canv.setFont('FreeSerif-Italic', 8)
    canv.setFillColor(TEXT_MUTED)
    canv.drawRightString(PAGE_W - RIGHT_MARGIN, 0.40 * inch, FOOTER_RIGHT)
    canv.restoreState()


# ---------- Helpers ----------
def add_heading(text, style, level=0):
    key = 'h_' + hashlib.md5(text.encode('utf-8')).hexdigest()[:8]
    p = Paragraph(f'<a name="{key}"/>{text}', style)
    p.bookmark_name = key
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p


def h1(text, story):
    """Chapter heading with kicker number + accent rule."""
    parts = text.split('.', 1)
    if len(parts) == 2 and parts[0].strip().isdigit():
        num_str = parts[0].strip()
        title_str = parts[1].strip()
    else:
        num_str = ''
        title_str = text

    # Use CondPageBreak to avoid orphan headings (only break if needed)
    available_height = PAGE_H - TOP_MARGIN - BOTTOM_MARGIN
    story.append(CondPageBreak(available_height * 0.22))

    if num_str:
        story.append(Paragraph(f'CAPÍTULO {num_str}', STY_H1_NUM))
    story.append(add_heading(title_str, STY_H1, level=0))
    # Accent rule under heading
    story.append(HRFlowable(width=72, thickness=2.4, color=ACCENT,
                            spaceBefore=2, spaceAfter=14, hAlign='LEFT'))


def h2(text, story):
    """H2 subheading — NOT registered in TOC (only chapters appear in TOC)."""
    story.append(Paragraph(text, STY_H2))


def h3(text, story):
    story.append(Paragraph(text, STY_H3))


def p(text, story=None, style=None):
    style = style or STY_BODY
    para = Paragraph(text, style)
    if story is not None:
        story.append(para)
    return para


def bullets(items, story, style=None):
    style = style or STY_BULLET
    for it in items:
        story.append(Paragraph(f'<font color="#10b981">▸</font>  {it}', style))


def callout_row(items):
    """A row of stat callouts: [(big_value, label), ...]
    Single-table layout with unified background and inner divider rules
    so the QA centering check sees one centered table, not 4 mini-tables.
    """
    n = len(items)
    spacer_w = 0
    cell_w = (CONTENT_W - spacer_w * (n - 1)) / n
    big_row = []
    lbl_row = []
    col_widths = []
    for i, (big, lbl) in enumerate(items):
        if i > 0:
            big_row.append('')
            lbl_row.append('')
            col_widths.append(spacer_w)
        big_row.append(Paragraph(f'<b>{big}</b>', STY_CALLOUT_NUM))
        lbl_row.append(Paragraph(lbl, STY_CALLOUT_LBL))
        col_widths.append(cell_w)
    data = [big_row, lbl_row]
    t = Table(data, colWidths=col_widths, hAlign='CENTER')
    style_cmds = [
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BACKGROUND', (0, 0), (-1, -1), CARD_BG),
        ('LINEABOVE', (0, 0), (-1, 0), 2, ACCENT),
        ('TOPPADDING', (0, 0), (-1, 0), 14),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 2),
        ('TOPPADDING', (0, 1), (-1, 1), 0),
        ('BOTTOMPADDING', (0, 1), (-1, 1), 14),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER),
    ]
    # Inner vertical dividers between callout cells (skip spacer cols)
    col_i = 0
    for i in range(n - 1):
        col_i += 1  # advance to spacer col
        style_cmds.append(('LINEBEFORE', (col_i, 0), (col_i, -1), 0.5, BORDER))
        col_i += 1
    t.setStyle(TableStyle(style_cmds))
    return t


def disclaimer_box(text, story):
    """A disclaimer callout box with left accent border."""
    t = Table([[Paragraph(text, STY_DISCLAIMER)]],
              colWidths=[CONTENT_W])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), SECTION_BG),
        ('LINEBEFORE', (0, 0), (0, -1), 3, ACCENT_AMBER),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(t)
    story.append(Spacer(1, 10))


def make_table(data, col_widths, header_rows=1, repeat_header=True,
               first_col_left=False, last_col_right=False):
    """Build a standard styled table. data = list of rows of Paragraph or str."""
    t = Table(data, colWidths=col_widths, hAlign='CENTER',
              repeatRows=header_rows if repeat_header else 0)
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, header_rows - 1), TABLE_HEADER_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, header_rows - 1), colors.white),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.4, BORDER),
        ('LINEABOVE', (0, 0), (-1, 0), 1.2, HEADER_FILL),
        ('LINEBELOW', (0, -1), (-1, -1), 1.2, HEADER_FILL),
    ]
    # Stripe rows below header
    for i in range(header_rows, len(data)):
        bg = TABLE_ROW_ODD if (i - header_rows) % 2 == 0 else TABLE_ROW_EVEN
        style_cmds.append(('BACKGROUND', (0, i), (-1, i), bg))
    if first_col_left:
        style_cmds.append(('ALIGN', (0, header_rows), (0, -1), 'LEFT'))
    if last_col_right:
        style_cmds.append(('ALIGN', (-1, header_rows), (-1, -1), 'RIGHT'))
    t.setStyle(TableStyle(style_cmds))
    return t


# ---------- Sparkline chart (minimal SVG-like) ----------
class Sparkline(Flowable):
    """Tiny inline sparkline-style mini chart. Renders to canvas."""
    def __init__(self, data, width=80, height=18, color=None, fill=True):
        self.data = list(data)
        self.width = width
        self.height = height
        self.color = color or ACCENT
        self.fill = fill

    def wrap(self, *args):
        return (self.width, self.height)

    def draw(self):
        c = self.canv
        if len(self.data) < 2:
            return
        mn, mx = min(self.data), max(self.data)
        rng = (mx - mn) or 1
        n = len(self.data)
        x_step = self.width / (n - 1)
        pts = []
        for i, v in enumerate(self.data):
            x = i * x_step
            y = (v - mn) / rng * (self.height - 4) + 2
            pts.append((x, y))
        # Fill area under line
        if self.fill:
            c.setFillColor(self.color)
            c.setFillAlpha(0.12)
            path = c.beginPath()
            path.moveTo(pts[0][0], 0)
            for x, y in pts:
                path.lineTo(x, y)
            path.lineTo(pts[-1][0], 0)
            path.close()
            c.drawPath(path, fill=1, stroke=0)
            c.setFillAlpha(1.0)
        # Line
        c.setStrokeColor(self.color)
        c.setLineWidth(1.2)
        path = c.beginPath()
        path.moveTo(*pts[0])
        for x, y in pts[1:]:
            path.lineTo(x, y)
        c.drawPath(path, fill=0, stroke=1)
        # End dot
        c.setFillColor(self.color)
        c.circle(pts[-1][0], pts[-1][1], 1.6, fill=1, stroke=0)


# Mini bar chart for ROI / savings visualization
class MiniBarChart(Flowable):
    """Simple bar chart, horizontal bars."""
    def __init__(self, data, labels, width=None, height=None,
                 bar_color=None, max_value=None):
        self.data = list(data)
        self.labels = list(labels)
        self.width = width or CONTENT_W
        self.height = height or (max(20, len(data) * 14 + 10))
        self.bar_color = bar_color or ACCENT
        self.max_value = max_value or max(self.data)

    def wrap(self, *args):
        return (self.width, self.height)

    def draw(self):
        c = self.canv
        n = len(self.data)
        label_w = self.width * 0.30
        bar_area_w = self.width * 0.55
        value_w = self.width * 0.15
        row_h = (self.height - 4) / n
        bar_h = row_h * 0.55
        for i, v in enumerate(self.data):
            y_top = self.height - 2 - i * row_h
            y_mid = y_top - row_h / 2
            # Label
            c.setFillColor(TEXT_PRIMARY)
            c.setFont('FreeSerif', 8)
            c.drawString(0, y_mid - 3, self.labels[i][:38])
            # Bar
            bar_len = (v / self.max_value) * bar_area_w if self.max_value else 0
            c.setFillColor(self.bar_color)
            c.setFillAlpha(0.85)
            c.rect(label_w, y_mid - bar_h / 2, bar_len, bar_h, fill=1, stroke=0)
            c.setFillAlpha(1.0)
            # Value
            c.setFillColor(HEADER_FILL)
            c.setFont('FreeSerif-Bold', 8)
            value_str = f"{v:,.1f}M"
            c.drawString(label_w + bar_area_w + 4, y_mid - 3, value_str)


# ---------- Build story ----------
def build_story():
    story = []

    # ============ TOC PAGE ============
    story.append(Paragraph('Índice', STY_TOC_TITLE))
    story.append(Paragraph(
        '<i>Table of Contents · Contenido del documento</i>',
        _style('TocSub', fontSize=10, leading=13, alignment=TA_LEFT,
               textColor=TEXT_MUTED, spaceAfter=6, fontName='FreeSerif-Italic')
    ))
    story.append(HRFlowable(width=72, thickness=2.4, color=ACCENT,
                            spaceBefore=2, spaceAfter=18, hAlign='LEFT'))
    toc = TableOfContents()
    toc.levelStyles = [
        ParagraphStyle(name='TOCH1', fontName='FreeSerif-Bold', fontSize=11.5,
                       leading=20, leftIndent=0, rightIndent=24,
                       textColor=HEADER_FILL),
    ]
    story.append(toc)
    story.append(PageBreak())

    # ============ CHAPTER 1: RESUMEN EJECUTIVO ============
    h1('1. Resumen Ejecutivo', story)

    p("Qik es el primer neobanco de la República Dominicana, filial del Grupo "
      "Popular y operado bajo el paraguas del Banco Popular Dominicano. Desde "
      "su lanzamiento ha demostrado que la banca digital dominicana puede "
      "competir en velocidad, simplicidad y experiencia de usuario con los "
      "referentes internacionales más exigentes. Esta propuesta presenta "
      "<b>QIK AI COMMAND CENTER</b>, un sistema de inteligencia artificial "
      "ejecutiva donde <b>20 agentes IA</b> trabajan 24/7 analizando "
      "información pública del mercado bancario dominicano y referentes "
      "internacionales, para que los ejecutivos del banco tomen mejores "
      "decisiones cada día.", story)

    p("El objetivo estratégico de la plataforma es convertir al banco en una "
      "<b>organización de decisión acelerada por IA</b>, capaz de captar "
      "oportunidades antes que la competencia, reducir costos operativos "
      "mediante automatización inteligente, y liberar tiempo del talento "
      "humano para tareas de mayor valor estratégico. No se trata de un "
      "chatbot ni de una capa cosmética de IA generativa: se trata de "
      "infraestructura de decisión ejecutiva.", story)

    h2('Propuesta de valor', story)
    bullets([
        "<b>Reducción del tiempo de reacción</b> a movimientos competitivos y de "
        "mercado: de semanas a horas, mediante monitoreo continuo de "
        "competidores, redes sociales y entorno macroeconómico.",
        "<b>Reducción de morosidad</b> vía prevención temprana: el agente "
        "<i>Risk Prevention AI</i> predice mora antes de que ocurra y "
        "dispara intervenciones preventivas personalizadas.",
        "<b>Aumento de depósitos</b> vía gamificación responsable: retos de "
        "ahorro, metas, recompensas y campañas estacionales gestionadas por "
        "los agentes <i>Deposit Growth AI</i> y <i>Loyalty & Rewards AI</i>.",
        "<b>Eficiencia operativa</b> que libera tiempo de equipos para tareas "
        "de mayor valor: cada agente asume o potencia funciones que hoy "
        "requieren empleados especializados, sin necesidad de despido.",
        "<b>Ventaja competitiva sostenida</b>: decisiones más rápidas, mejor "
        "experiencia del cliente y escalabilidad sin contratación proporcional.",
    ], story)

    story.append(Spacer(1, 14))
    story.append(callout_row([
        ("20", "Agentes IA especializados"),
        ("24/7", "Monitoreo continuo del mercado"),
        ("~RD$32.7M", "Capacidad liberada / año (estimación ilustrativa)"),
        ("6–9 meses", "Payback estimado del proyecto"),
    ]))
    story.append(Spacer(1, 12))

    p("Este documento describe en detalle el contexto del mercado bancario "
      "dominicano, la visión y filosofía del producto, los 20 agentes IA con "
      "su especificación completa, los paneles del dashboard, las "
      "animaciones, el stack tecnológico, el caso de valor en ahorro de "
      "costos y optimización de equipos, una crítica honesta desde la "
      "perspectiva de un comité de inversión, el roadmap de implementación "
      "a 90 días, y los próximos pasos requeridos.", story)

    p("Toda la información de mercado citada proviene de fuentes públicas "
      "(qik.do, Banco Central RD, Superintendencia de Bancos, app stores, "
      "redes sociales oficiales). Las estimaciones de ahorro y capacidad "
      "liberada están marcadas explícitamente como <i>estimación "
      "ilustrativa</i> y deberán calibrarse con datos internos de Qik tras "
      "la autorización del proyecto.", story)

    # ============ CHAPTER 2: CONTEXTO DEL MERCADO ============
    h1('2. Contexto del Mercado Bancario Dominicano', story)

    p("El mercado bancario dominicano es uno de los más dinámicos del "
      "Caribe, con una penetación bancaria creciente y un ecosistema de "
      "productos digitales en plena expansión. Qik opera como el primer "
      "neobanco del país, con licencia y respaldo del Banco Popular "
      "Dominicano (parte del Grupo Popular), uno de los bancos "
      "multifinance más grandes de la República Dominicana.", story)

    h2('Qik: datos públicos clave', story)
    bullets([
        "<b>Posición</b>: primer neobanco de la República Dominicana, filial "
        "del Grupo Popular / Banco Popular Dominicano.",
        "<b>RNC</b>: 1-32-49841-2. <b>Teléfono</b>: 809-364-2161. "
        "<b>Correo de ayuda</b>: ayuda@qik.com.do.",
        "<b>Cuenta Qik</b>: cuenta de ahorros en pesos y dólares, con "
        "rendimiento anual de 3–6%, sin comisiones y sin saldo mínimo.",
        "<b>Tarjeta de Crédito Qik</b>: tarjeta con cashback y control "
        "total desde la app.",
        "<b>Certificados Qik</b>: certificados financieros con tasa 1% "
        "mayor que la cuenta de ahorros tradicional.",
        "<b>Préstamos personales</b>: productos de crédito personales "
        "100% digitales.",
        "<b>Qik Pro</b>: versión premium del producto con beneficios "
        "adicionales.",
        "<b>Programa Crea Crédito</b>: programa para construir o restaurar "
        "historial crediticio, una innovación relevante para inclusión "
        "financiera en RD.",
        "<b>Toque</b>: pagos P2P solo con número celular, producto "
        "competitivo en la categoría de transferencias inmediatas.",
    ], story)

    h2('Competidores en República Dominicana', story)
    p("Qik opera en un mercado competitivo, con jugadores tradicionales "
      "fuertes que han lanzado productos digitales y otros neobancos en "
      "posiciones de aprendizaje avanzadas. Los competidores relevantes "
      "para el análisis del sistema son:", story)
    bullets([
        "<b>Banreservas</b>: líder del mercado, con app Banreservas y "
        "<i>Yappy</i>, la plataforma P2P dominante en RD.",
        "<b>Banco BHD</b>: cuenta con <i>Cuenta Móvil BHD</i>, 100% digital, "
        "y una de las apps más sólidas del sector.",
        "<b>Banco Popular Dominicano</b>: banco matriz de Qik, con su "
        "<i>Cuenta Digital Libre</i>. Qik funciona como su marca neobanco.",
        "<b>APAP</b>: banco de ahorros y crédito con productos de "
        "certificados, tarjetas y préstamos.",
        "<b>Scotiabank República Dominicana</b>: banco internacional con "
        "presencia local relevante.",
        "<b>Banco Santa Cruz, Banco Caribe, BDI, Ademi</b>: bancos "
        "medianos y asociaciones de ahorros con nichos específicos.",
        "<b>Asociación Cibao, Asociación La Nacional</b>: asociaciones de "
        "ahorro y crédito con fuerte presencia regional.",
    ], story)

    h2('Referentes internacionales', story)
    p("El sistema también monitorea referentes internacionales cuya "
      "innovación en productos, UX y growth sirve de benchmark para Qik:", story)
    bullets([
        "<b>Nubank</b> (Brasil): el neobanco más grande del mundo por "
        "número de clientes, referente en baja de costo de adquisición.",
        "<b>Revolut</b> (UK): multi-currency, cripto, inversiones, "
        "suscripción premium.",
        "<b>Wise</b> (UK): líder en transferencias internacionales "
        "transparentes y de bajo costo.",
        "<b>Monzo</b> (UK): pionero en notificaciones en tiempo real y "
        "diseño de app centrado en el usuario.",
        "<b>Mercado Pago</b> (LatAm): ecosistema financiero integrado al "
        "comercio electrónico, alto engagement.",
    ], story)

    h2('Contexto macroeconómico (BCRD)', story)
    p("El Banco Central de la República Dominicana (BCRD) mantiene la "
      "<b>Tasa de Política Monetaria (TPM) en 5.25% anual</b>. La "
      "inflación interanual se ubica en torno al <b>3.1%</b>, dentro del "
      "rango meta de <b>4% ± 1%</b> establecido por el BCRD mediante su "
      "Esquema de Metas de Inflación. El PIB proyectado para 2026 se "
      "ubica en torno al <b>+1.2%</b>, tras un crecimiento estimado del "
      "<b>+1.5%</b> en 2025.", story)

    p("Este entorno macro define las condiciones de costo de fondeo, "
      "rendimientos de certificados y atractivo relativo de los "
      "productos de ahorro. QIK AI COMMAND CENTER integra estos datos "
      "del BCRD en sus análisis para contextualizar las decisiones de "
      "producto, pricing y captación.", story)

    h2('Marco regulatorio', story)
    p("El sistema bancario dominicano es supervisado por la "
      "<b>Superintendencia de Bancos</b> (sb.gob.do). Toda automatización "
      "del sistema — especialmente en cobranza, prevención de mora y "
      "comunicaciones al cliente — respeta las políticas de cobranza "
      "responsable y la regulación vigente. Ninguna decisión automatizada "
      "de crédito se ejecuta sin gobernanza humana.", story)

    # ============ CHAPTER 3: VISIÓN Y FILOSOFÍA ============
    h1('3. Visión y Filosofía del Producto', story)

    p("QIK AI COMMAND CENTER no es un chatbot. Es un <b>sistema de decisión "
      "ejecutiva</b> diseñado para operar como infraestructura nerviosa "
      "central del banco. Cada uno de los 20 agentes está especializado en "
      "un dominio específico del negocio bancario, y trabaja 24/7 "
      "analizando información pública y — cuando se autorice — datos "
      "internos del banco, generando recomendaciones accionables que "
      "alimentan paneles ejecutivos, alertas y briefings diarios.", story)

    h2('Anatomía de cada agente', story)
    p("Cada agente sigue una estructura común que garantiza trazabilidad, "
      "explicabilidad y valor accionable. La especificación completa de "
      "cada agente incluye los siguientes componentes:", story)
    bullets([
        "<b>Objetivo</b>: qué decisión ejecutiva potencia o reemplaza.",
        "<b>Datos que analiza</b>: fuentes públicas, internas y de terceros.",
        "<b>Cómo razona</b>: lógica de inferencia, modelos, prompts.",
        "<b>Resultados</b>: outputs estructurados (scores, rankings, síntesis).",
        "<b>Alertas</b>: umbrales que disparan notificaciones prioritarias.",
        "<b>Recomendaciones</b>: acciones concretas propuestas al ejecutivo.",
        "<b>Automatizaciones</b>: workflows cerrados que el agente ejecuta.",
        "<b>Valor para el banco</b>: impacto directo en KPIs y P&L.",
        "<b>KPIs relacionados</b>: métricas que el agente mueve.",
    ], story)

    h2('Inspiración visual y de producto', story)
    p("La estética del dashboard se inspira en los mejores referentes "
      "globales de producto de datos, fintech y plataformas de decisión:", story)
    bullets([
        "<b>Apple</b>: jerarquía tipográfica, espacios generosos, "
        "transiciones discretas.",
        "<b>Linear</b>: densidad informativa con elegancia minimalista.",
        "<b>Bloomberg Terminal</b>: información jerarquizada por "
        "prioridad, color funcional.",
        "<b>Notion</b>: flexibilidad de bloques y composición de paneles.",
        "<b>Stripe</b>: claridad de datos, microinteracciones precisas.",
        "<b>OpenAI</b>: elegancia en la presentación de IA generativa.",
        "<b>Tesla</b>: foco en el dato crítico, sin distracciones.",
        "<b>Palantir</b>: seriedad institucional, sensación de "
        "infraestructura de misión.",
    ], story)

    h2('Principios rectores', story)
    p("El sistema obedece siete principios no negociables que gobiernan "
      "todas las decisiones de diseño, producto y operación:", story)
    bullets([
        "<b>Tecnología</b>: stack moderno, escalable y observable.",
        "<b>Seguridad</b>: cifrado en tránsito y reposo, principio de "
        "mínimo privilegio, auditoría completa.",
        "<b>Innovación</b>: cada día una idea nueva de producto o servicio.",
        "<b>Elegancia</b>: cada pixel y cada interacción comunica seriedad.",
        "<b>Velocidad</b>: detección → recomendación → decisión en horas.",
        "<b>Confianza</b>: explicabilidad, gobernanza humana, derecho a "
        "explicación.",
        "<b>Nivel empresarial</b>: listo para comité ejecutivo del banco.",
    ], story)

    # ============ CHAPTER 4: LOS 20 AGENTES IA ============
    h1('4. Los 20 Agentes IA', story)

    p("Esta sección presenta la especificación completa de cada uno de los "
      "20 agentes que componen QIK AI COMMAND CENTER. Cada agente incluye "
      "su categoría, objetivo, datos que analiza, cómo razona, resultados, "
      "alertas, recomendaciones, valor para el banco y KPIs relacionados. "
      "La tabla resumen permite al lector localizar cualquier agente en "
      "una sola página; las fichas detalladas que siguen proporcionan el "
      "contexto completo.", story)

    # ---- Resumen table ----
    h2('Tabla resumen', story)
    summary_rows = [
        [Paragraph('<b>#</b>', STY_TBL_HEAD),
         Paragraph('<b>Agente</b>', STY_TBL_HEAD),
         Paragraph('<b>Categoría</b>', STY_TBL_HEAD),
         Paragraph('<b>Objetivo</b>', STY_TBL_HEAD)],
    ]
    agents_summary = [
        (1,  'Competitor Intelligence AI', 'Inteligencia', 'Monitorea Banreservas, BHD, Popular, APAP, Scotia y referentes internacionales'),
        (2,  'Viral Content AI',           'Marketing',    'Detecta tendencias virales en TikTok, IG, Threads, YouTube Shorts'),
        (3,  'Creative Analyzer AI',       'Marketing',    'Evalúa anuncios, landings y creativos con principios de psicología y conversión'),
        (4,  'Social Listening AI',        'CX',           'Escucha conversaciones públicas, detecta quejas, solicitudes, sentimiento'),
        (5,  'Referral Growth AI',         'Growth',       'Maximiza referidos con incentivos escalonados, retos y gamificación'),
        (6,  'Customer Retention AI',      'CX',           'Detecta usuarios con menor actividad y sugiere campañas personalizadas'),
        (7,  'Deposit Growth AI',          'Producto',     'Retos de ahorro, metas, recompensas y campañas estacionales'),
        (8,  'Loyalty & Rewards AI',       'Fidelización', 'Niveles Bronce/Plata/Oro/Platino/Diamante por comportamiento responsable'),
        (9,  'Smart Payment Reminder AI',  'Cobros',       'Recordatorios personalizados al mejor momento y canal'),
        (10, 'Smart Recovery AI',          'Cobros',       'Planes de regularización responsables con beneficios por pagos al día'),
        (11, 'Risk Prevention AI',         'Riesgo',       'Predice mora antes de que ocurra, dispara intervenciones preventivas'),
        (12, 'Feature Suggestion AI',      'Innovación',   'Features de Revolut, Nubank, Wise, Monzo, Mercado Pago priorizadas por ICE'),
        (13, 'Promotion Generator AI',     'Marketing',    'Campañas estacionales (regreso a clases, Black Friday, Navidad, aguinaldo)'),
        (14, 'Executive Advisor AI',       'Ejecutiva',    'Briefing diario al CEO con riesgos, oportunidades, ideas y KPIs'),
        (15, 'Dashboard Metrics AI',       'Ejecutiva',    'Explica qué ocurrió, por qué, qué puede pasar y qué decisión tomar'),
        (16, 'UX Auditor AI',              'Producto',     'Detecta fricciones en la app y propone mejoras priorizadas'),
        (17, 'Banking Innovation AI',      'Innovación',   'Genera cada día una idea nueva de producto o servicio'),
        (18, 'AI Automation Center',       'Operaciones',  'Detecta tareas repetitivas automatizables con ROI calculado'),
        (19, 'Reputation AI',              'CX',           'Mide reputación diaria de Qik y competidores, alertas tempranas'),
        (20, 'Product Roadmap AI',         'Producto',     'Prioriza features por RICE (Reach × Impact × Confidence / Effort)'),
    ]
    for num, name, cat, obj in agents_summary:
        summary_rows.append([
            Paragraph(str(num), STY_TBL_CELL_C),
            Paragraph(f'<b>{name}</b>', STY_TBL_CELL),
            Paragraph(cat, STY_TBL_CELL_C),
            Paragraph(obj, STY_TBL_CELL),
        ])
    # Column widths sum to CONTENT_W
    col_w = [CONTENT_W * r for r in (0.05, 0.24, 0.16, 0.55)]
    summary_tbl = make_table(summary_rows, col_w, header_rows=1,
                             first_col_left=False)
    story.append(summary_tbl)
    story.append(Paragraph('Tabla 1. Los 20 agentes IA de QIK AI COMMAND CENTER.',
                           STY_CAPTION))

    # ---- Detailed agent cards ----
    h2('Fichas detalladas', story)
    p("Cada ficha presenta la especificación completa del agente: objetivo, "
      "datos, razonamiento, resultados, alertas, recomendaciones, valor y "
      "KPIs. Las fichas están organizadas en el mismo orden que la tabla "
      "resumen, agrupadas temáticamente cuando pertenece al mismo panel "
      "del dashboard.", story)

    agents_detail = [
        # (num, name, category, objective, data_sources, reasoning, outputs,
        #  alerts, recommendations, value, kpis)
        (1, 'Competitor Intelligence AI', 'Inteligencia',
         'Monitorear continuamente a los competidores dominicanos y referentes internacionales para detectar movimientos competitivos antes que se conviertan en amenazas.',
         'Apps y sitios web de Banreservas, BHD, Popular, APAP, Scotiabank, Santa Cruz, Caribe, BDI, Ademi; Nubank, Revolut, Wise, Monzo, Mercado Pago; comunicaciones de prensa; redes sociales oficiales; App Store y Google Play reviews; Superintendencia de Bancos.',
         'Comparación estructural de productos (tasas, comisiones, requisitos), análisis de cambios en apps (versiones, features), scoring de amenaza competitiva ponderado por cercanía geográfica y segmento.',
         'Matriz comparativa de productos RD, scoreboard internacional, alertas priorizadas de movimientos competitivos, briefing semanal de competencia.',
         'Lanzamiento de producto similar en competidor RD; cambio de tasa en certificados > 50bps; feature innovador en referente internacional replicable en 90 días.',
         'Responder con feature/campaña en 30 días; replicar feature de referente internacional; ajustar pricing de certificados.',
         'Reducción del tiempo de reacción a movimientos competitivos de semanas a horas.',
         'Tiempo de reacción a movimiento competitivo, market share, NPS relativo, diferencia de tasa vs competencia.'),
        (2, 'Viral Content AI', 'Marketing',
         'Detectar tendencias virales en redes sociales y generar hooks, guiones y calendario de contenido para que Qik capitalice oportunidades orgánicas.',
         'TikTok, Instagram Reels, Threads, YouTube Shorts; hashtags trending RD; creadores de contenido financiero; audio trends; análisis de cuenta @qikbanco y referentes.',
         'Detección de patrón viral (audio, hook, formato, longitud) con score de replicabilidad; correlación con audiencia bancaria dominicana; generación de variaciones.',
         'Hooks priorizados, guiones de 15–60s, calendario semanal, brief para creadores, métricas esperadas por formato.',
         'Trend con ventana de oportunidad < 72h; formato emergente con score > 8/10; creador con audiencia alineada disponible.',
         'Publicar contenido en 24h sobre el trend; testear 3 variantes de hook; ajustar formato al benchmark del top 1%.',
         'Aumento del alcance orgánico, reducción del CAC, posicionamiento de marca como referente cultural.',
         'Alcance orgánico, engagement rate, CAC orgánico, follower growth, share of voice.'),
        (3, 'Creative Analyzer AI', 'Marketing',
         'Evaluar anuncios, landings y creativos con principios de psicología y conversión antes de invertir presupuesto.',
         'Anuncios pagados de Qik y competidores; landings de productos; meta ads library; creativos históricos con resultados; bibliotecas de frameworks de copywriting y psicología.',
         'Aplicación de frameworks (AIDA, PAS, FAB, social proof, scarcity, anchoring) con scoring ponderado por etapa de funnel; análisis de copy, visual, CTA y friction.',
         'Score de creativo por dimensión, predicción de CTR/CVR, recomendaciones de mejora, A/B tests propuestos.',
         'Creativo con score < 6/10 antes de invertir; landing con friction alta; CTA débil en funnel crítico.',
         'Iterar creativo antes de invertir; reemplazar landing de producto crítico; testear 2 variantes de CTA.',
         'Reducción del CPA, mejora del CVR, mejor asignación del presupuesto de medios.',
         'CPA, CTR, CVR, ROAS, calidad de creativo (score promedio).'),
        (4, 'Social Listening AI', 'CX',
         'Escuchar conversaciones públicas sobre Qik y competidores para detectar quejas, solicitudes y sentimiento en tiempo real.',
         'X (Twitter), Threads, Instagram, TikTok, Reddit, foros dominicanos, reseñas App Store y Google Play, comentarios de YouTube.',
         'NLP de sentimiento por tema y producto; clasificación de intención (queja, solicitud, elogio, pregunta); routing automático al equipo responsable; detección de crisis incipiente.',
         'Feed priorizado de menciones, score de sentimiento diario, temas emergentes, alertas de crisis.',
         'Volumen de menciones negativas +50% en 24h; queja recurrente sobre feature crítica; sentimiento de marca < umbral.',
         'Activar protocolo de crisis; escalar a CX; comunicar fix en roadmap; responder en redes.',
         'Reducción del tiempo de respuesta a quejas, mejora de NPS, prevención de crisis reputacional.',
         'Sentimiento neto, tiempo de respuesta a queja, NPS, share of voice, volatilidad de sentimiento.'),
        (5, 'Referral Growth AI', 'Growth',
         'Maximizar referidos con incentivos escalonados, retos y gamificación responsable.',
         'Datos de referidos históricos, programa actual de referidos, comportamiento de usuarios referidores top, benchmarks de programas de Revolut/Nubank/Mercado Pago.',
         'Segmentación de usuarios por potencial referidor; modelado de elasticidad de incentivo; diseño de retos escalonados con techo responsable.',
         'Planes de incentivos por segmento, retos estacionales, leaderboard de referidores, proyección de captación.',
         'Caída de referidos > 20% MoM; segmento de alto potencial sin incentivo activo; saturación de incentivo actual.',
         'Lanzar reto estacional; aumentar incentivo en segmento de alto potencial; testear doble incentivo (referrer + referee).',
         'Aumento de captación orgánica vía referidos, reducción del CAC blended.',
         'Referral rate, CAC blended, viral coefficient (k), LTV de usuarios referidos.'),
        (6, 'Customer Retention AI', 'CX',
         'Detectar usuarios con menor actividad y sugerir campañas personalizadas de reactivación.',
         'Datos de actividad de cuenta (transacciones, login, saldo, uso de features), eventos de churn histórico, segmentos de usuario.',
         'Modelo de propensión a churn (XGBoost/Gradient Boosting); segmentación por reason code de churn; matching de incentivo a reason.',
         'Lista priorizada de usuarios en riesgo, motivo predictivo, recomendación de campaña, canal y momento óptimo.',
         'Usuario con probabilidad de churn > 60% en 30 días; segmento con caída de actividad > 30%; usuario premium inactivo.',
         'Activar campaña de retención personalizada; ofrecer beneficio específico al motivo; agendar llamada de CX.',
         'Reducción del churn mensual, aumento del LTV, mejora de la actividad promedio.',
         'Churn rate mensual, LTV, DAU/MAU ratio, retention curve por cohorte.'),
        (7, 'Deposit Growth AI', 'Producto',
         'Diseñar retos de ahorro, metas, recompensas y campañas estacionales que aumenten el saldo promedio por usuario.',
         'Saldos promedio, comportamiento de ahorro histórico, calendario estacional RD (aguinaldo, bono, escolar), tasas BCRD, productos competidores.',
         'Segmentación por capacidad de ahorro; diseño de retas con meta SMART; modelado de impacto en saldo promedio; optimización de recompensa.',
         'Calendario anual de retos, proyección de crecimiento de saldo, parámetros de recompensa, segmentos objetivo.',
         'Saldo promedio en caída > 5% MoM; ventana estacional (aguinaldo) sin reto activo; oportunidad de tasa BCRD.',
         'Lanzar reto estacional; ajustar rendimiento de cuenta; comunicar meta de ahorro personalizada.',
         'Aumento del saldo promedio por usuario, aumento del depósito total, mejora de la relación depósito/crédito.',
         'Saldo promedio, depósito total, growth rate de depósitos, depósito por cohort.'),
        (8, 'Loyalty & Rewards AI', 'Fidelización',
         'Gestionar niveles Bronce/Plata/Oro/Platino/Diamante basados en comportamiento financiero responsable.',
         'Comportamiento histórico (pagos a tiempo, ahorro, uso de productos), niveles actuales, beneficios por nivel, benchmarks de programas de lealtad.',
         'Definición de criterios por nivel (no solo saldo); modelado de ascensos y descensos; diseño de beneficios con costo marginal controlado.',
         'Distribución de usuarios por nivel, beneficios por nivel, proyección de ascensos, ROI del programa.',
         'Segmento con bajo ascenso; beneficio subutilizado; nivel sin diferenciación clara.',
         'Reestructurar criterios de nivel; añadir beneficio de alto valor percibido bajo costo; comunicar progreso al usuario.',
         'Aumento del engagement, reducción del churn en niveles altos, mayor cross-sell.',
         'Distribución por nivel, ascenso rate, churn por nivel, cross-sell rate, NPS por nivel.'),
        (9, 'Smart Payment Reminder AI', 'Cobros',
         'Enviar recordatorios personalizados al mejor momento y canal para maximizar pagos a tiempo.',
         'Histórico de pagos, comportamiento de respuesta por canal (push, SMS, email, WhatsApp), preferencias del usuario, calendario de vencimientos.',
         'Modelado del mejor momento (día/hora) y canal por usuario; mensaje optimizado por perfil; frecuencia adaptativa.',
         'Calendario de recordatorios por usuario, canal óptimo, mensaje generado, proyección de pago a tiempo.',
         'Usuario con probabilidad de pago tardío > 50%; canal saturado; mensaje con baja respuesta histórica.',
         'Cambiar canal; ajustar momento; personalizar mensaje; ofrecer plan de pago anticipado.',
         'Aumento del pago a tiempo, reducción de mora temprana, menor costo de cobranza.',
         'Pago a tiempo rate, días de mora promedio, costo de cobranza, canal ROI.'),
        (10, 'Smart Recovery AI', 'Cobros',
         'Diseñar planes de regularización responsables con beneficios por pagos consecutivos al día.',
         'Histórico de mora, planes de regularización anteriores, comportamiento post-plan, costo legal, regulación SB.',
         'Segmentación por capacidad de pago; diseño de plan realista (cuota, plazo, perdón condicional); modelado de probabilidad de éxito.',
         'Planes personalizados propuestos, proyección de recuperación, costo legal evitado, score de éxito.',
         'Mora > 30 días sin plan; usuario con capacidad de pago sin contacto; plan fallido recurrente.',
         'Ofrecer plan personalizado; condonar intereses condicionalmente; asignar gestor especializado.',
         'Reducción de mora, mayor recuperación, menor costo legal, mejora del bucket curve.',
         'Tasa de recuperación, bucket curve, costo legal, % de planes exitosos.'),
        (11, 'Risk Prevention AI', 'Riesgo',
         'Predecir mora antes de que ocurra y disparar intervenciones preventivas.',
         'Histórico de mora, comportamiento transaccional, scoring de crédito interno, datos demográficos anonimizados, ciclo macroeconómico.',
         'Modelos de ML (XGBoost, Gradient Boosting) con SHAP para explicabilidad; umbrales de intervención; gobernanza MRM.',
         'Score de riesgo por usuario, ranking de mora esperada, intervención recomendada, impacto en provisiones.',
         'Score de mora > umbral en cohorte sana; deterioro macroeconómico; concentración de riesgo por segmento.',
         'Intervención preventiva (límite, contacto, oferta); ajuste de política de otorgamiento; reserva adicional.',
         'Reducción de mora esperada, optimización de provisiones, mejora del ratio de cobertura.',
         'Mora esperada vs realizada, ratio de cobertura, migration rate entre buckets, calibration.'),
        (12, 'Feature Suggestion AI', 'Innovación',
         'Priorizar features de Revolut, Nubank, Wise, Monzo y Mercado Pago por ICE (Impact × Confidence × Ease).',
         'Changelog de apps referentes, análisis funcional, necesidades detectadas en CX, roadmap actual de Qik, capacidad de ingeniería.',
         'Decomposición de feature en componentes; scoring ICE con calibración por contexto RD; mapping a necesidades internas.',
         'Pipeline priorizado ICE, fichas técnicas resumidas, dependencias, ROI estimado.',
         'Feature de alto ICE en cola > 60 días; feature competidor lanzada sin respuesta; necesidad CX sin feature mapeada.',
         'Mover feature al top del roadmap; asignar sprint; comunicar prioridad al equipo de producto.',
         'Pipeline de producto más alineado a oportunidad, mejor ROI por sprint.',
         'ICE score promedio, time-to-market, % features con impacto medido, throughput.'),
        (13, 'Promotion Generator AI', 'Marketing',
         'Diseñar campañas estacionales (regreso a clases, Black Friday, Navidad, aguinaldo) con ROI proyectado.',
         'Calendario estacional RD, histórico de campañas, comportamiento de gasto, tasas BCRD, elasticidad de demanda.',
         'Modelado de elasticidad por temporada; diseño de oferta (descuento, cashback, tasa); proyección de captación y costo.',
         'Calendario anual de promociones, oferta por temporada, segmentos objetivo, ROI proyectado.',
         'Temporada sin campaña activa; ROI proyectado < umbral; caníbalización con producto existente.',
         'Lanzar campaña estacional; ajustar oferta por segmento; capitalizar ventana de alta demanda.',
         'Aumento de captación estacional, mejora del ROI por campaña, mejor forecasting.',
         'ROI por campaña, captación estacional, CPA estacional, elasticidad de demanda.'),
        (14, 'Executive Advisor AI', 'Ejecutiva',
         'Generar briefing diario al CEO con riesgos, oportunidades, ideas y KPIs en una sola lectura de 5 minutos.',
         'Salidas de los 19 agentes restantes, KPIs ejecutivos del banco, entorno macro, alertas activas.',
         'Síntesis LLM con prompting estructurado; priorización por impacto/esfuerzo; citación de fuente agente.',
         'Briefing diario de 1 página, top 3 riesgos, top 3 oportunidades, top 3 ideas, decisiones pendientes.',
         'Riesgo crítico no atendido; oportunidad > umbral sin decisión; KPI fuera de rango.',
         'Tomar decisión X hoy; reunir comité sobre riesgo Y; capitalizar oportunidad Z.',
         'Decisión ejecutiva más rápida, mejor contexto diario, menos reuniones informativas.',
         'Tiempo a decisión, % decisiones con rationale documentado, cobertura de briefing.'),
        (15, 'Dashboard Metrics AI', 'Ejecutiva',
         'Explicar qué ocurrió, por qué, qué puede pasar y qué decisión tomar para cada KPI crítico.',
         'Histórico de KPIs, eventos internos (campañas, lanzamientos), entorno externo, modelos de forecasting.',
         'Análisis de causa raíz con atribución; forecast a 30/60/90 días; recomendación de acción.',
         'Narrativa de KPI, contribución por factor, forecast, decisión recomendada.',
         'KPI crítico fuera de rango; forecast negativo; atribución poco clara.',
         'Profundizar en causa raíz; ajustar palanca; reforecast con nuevo plan.',
         'Mejor entendimiento del negocio, decisiones con mejor evidencia.',
         '% KPIs con narrativa actualizada, accuracy de forecast, latencia causa-raíz.'),
        (16, 'UX Auditor AI', 'Producto',
         'Detectar fricciones en la app y proponer mejoras priorizadas por impacto en conversión.',
         'Analytics de la app, heatmaps, grabaciones de sesión, funnels, crash reports, NPS por pantalla.',
         'Detección de drop-off en funnel; mapeo de fricción por pantalla; priorización por impacto conversión × esfuerzo ingeniería.',
         'Lista priorizada de fricciones, propuesta de fix, impacto estimado, effort.',
         'Drop-off > 40% en pantalla crítica; crash rate > umbral; NPS por pantalla bajo.',
         'Iterar UX en pantalla crítica; A/B test fix; remover paso innecesario.',
         'Mejora de conversión, reducción de churn UX-driven, mejor onboarding.',
         'Funnel conversion rate, drop-off por pantalla, NPS por pantalla, time-to-first-value.'),
        (17, 'Banking Innovation AI', 'Innovación',
         'Generar cada día una idea nueva de producto o servicio para el banco.',
         'Tendencias fintech globales, papers, lanzamientos de neobancos, oportunidades RD no atendidas.',
         'Combinación creativa de tendencias con contexto RD; filtrado por factibilidad regulatoria y técnica; pre-screening ICE.',
         'Idea diaria con descripción, target, hipótesis, métrica de éxito, costo estimado.',
         'Idea con ICE > umbral sin asignación; ventana regulatoria abierta; oportunidad competitiva no atacada.',
         'Agendar idea en pipeline de innovación; encargar spike de 1 semana; testear con 100 usuarios.',
         'Pipeline de innovación siempre lleno, ventaja de first-mover en nichos.',
         'Ideas generadas/mes, % ideas con spike, % ideas con MVP, ideas lanzadas/año.'),
        (18, 'AI Automation Center', 'Operaciones',
         'Detectar tareas repetitivas automatizables y calcular ROI antes de invertir en automatización.',
         'Auditoría de procesos, tickets de ops, tiempo por tarea, costo de FTE, errores manuales, RPA externo.',
         'Mapeo de proceso; identificación de cuellos de botella; modelado de ROI de automatización; recomendación de tecnología.',
         'Pipeline de automatización priorizado, ROI por caso, tecnología recomendada, plan de implementación.',
         'Proceso manual > X horas/semana; error recurrente; automatización externa cara.',
         'Lanzar automatización interna; reasignar FTE a tarea de mayor valor; cancelar RPA externo.',
         'Reducción de costo operativo, mejora de consistencia, reasignación de talento.',
         'Horas liberadas/mes, % procesos automatizados, error rate, costo evitado.'),
        (19, 'Reputation AI', 'CX',
         'Medir reputación diaria de Qik y competidores y disparar alertas tempranas.',
         'Menciones en medios, redes sociales, App Store, Google Play, foros, encuestas NPS externas.',
         'Índice compuesto de reputación por dimensión (producto, servicio, marca, confianza); benchmark vs competidores.',
         'Score diario de reputación, benchmark competitivo, dimensiones críticas, tendencia.',
         'Caída de score > 10% en 7 días; brecha vs competidor > umbral; crisis incipiente.',
         'Activar protocolo de comunicación; profundizar en dimensión crítica; responder en medios.',
         'Mejor reputación relativa, menor volatilidad, crisis detectadas antes.',
         'Reputation index, share of voice, NPS externo, sentimiento neto.'),
        (20, 'Product Roadmap AI', 'Producto',
         'Priorizar features por RICE (Reach × Impact × Confidence / Effort) y mantener el roadmap siempre alineado a estrategia.',
         'Pipeline de features, capacidad de ingeniería, OKRs estratégicos, dependencias, learnings de CX.',
         'Cálculo de RICE por feature; mapeo a OKRs; balance de short-term/long-term; secuenciación por dependencias.',
         'Roadmap priorizado trimestral, RICE score por feature, alineación a OKR, secuenciación óptima.',
         'Feature de alto RICE sin asignación; dependencia bloqueante; desalineación con OKR.',
         'Mover feature al trimestre actual; resolver dependencia; comunicar cambio de prioridad.',
         'Roadmap más predecible, mejor alineación a estrategia, mayor throughput de valor.',
         'RICE promedio, % features alineadas a OKR, throughput, predictibilidad de delivery.'),
    ]

    for spec in agents_detail:
        (num, name, cat, obj, data_src, reasoning, outputs,
         alerts, recs, value, kpis) = spec
        # Build agent card as a table
        title = Paragraph(
            f'<font color="#10b981">{num:02d}</font>     <b>{name}</b>',
            STY_AGENT_NAME
        )
        cat_para = Paragraph(
            f'<font color="#64748b">Categoría:</font> '
            f'<font color="#0f172a"><b>{cat}</b></font>',
            STY_AGENT_MUTED
        )
        # Detail rows: 2-column table (label, value)
        detail_rows = [
            [Paragraph('Objetivo', STY_AGENT_LABEL),
             Paragraph(obj, STY_AGENT_VAL)],
            [Paragraph('Datos que analiza', STY_AGENT_LABEL),
             Paragraph(data_src, STY_AGENT_VAL)],
            [Paragraph('Cómo razona', STY_AGENT_LABEL),
             Paragraph(reasoning, STY_AGENT_VAL)],
            [Paragraph('Resultados', STY_AGENT_LABEL),
             Paragraph(outputs, STY_AGENT_VAL)],
            [Paragraph('Alertas típicas', STY_AGENT_LABEL),
             Paragraph(alerts, STY_AGENT_VAL)],
            [Paragraph('Recomendaciones', STY_AGENT_LABEL),
             Paragraph(recs, STY_AGENT_VAL)],
            [Paragraph('Valor para el banco', STY_AGENT_LABEL),
             Paragraph(value, STY_AGENT_VAL)],
            [Paragraph('KPIs relacionados', STY_AGENT_LABEL),
             Paragraph(kpis, STY_AGENT_VAL)],
        ]
        inner = Table(detail_rows, colWidths=[CONTENT_W * 0.22, CONTENT_W * 0.78])
        inner.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 6),
            ('RIGHTPADDING', (0, 0), (-1, -1), 6),
            ('TOPPADDING', (0, 0), (-1, -1), 3),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
            ('LINEBELOW', (0, 0), (-1, -2), 0.3, BORDER),
            ('BACKGROUND', (0, 0), (0, -1), SECTION_BG),
        ]))
        # Wrap title + category + inner table into a single container table
        card = Table(
            [[title], [cat_para], [inner]],
            colWidths=[CONTENT_W]
        )
        card.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 10),
            ('RIGHTPADDING', (0, 0), (-1, -1), 10),
            ('TOPPADDING', (0, 0), (0, 0), 8),
            ('TOPPADDING', (0, 1), (-1, -1), 0),
            ('BOTTOMPADDING', (0, 0), (-1, 1), 3),
            ('BOTTOMPADDING', (0, -1), (-1, -1), 8),
            ('BACKGROUND', (0, 0), (-1, -1), colors.white),
            ('LINEBEFORE', (0, 0), (0, -1), 3, ACCENT),
            ('BOX', (0, 0), (-1, -1), 0.4, BORDER),
        ]))
        # Keep title + first rows together to avoid orphan title
        story.append(KeepTogether([card, Spacer(1, 6)]))

    # ============ CHAPTER 5: PANELES DEL DASHBOARD ============
    h1('5. Paneles Especializados del Dashboard', story)

    p("El dashboard de QIK AI COMMAND CENTER está organizado en nueve "
      "paneles especializados que agrupan agentes, KPIs y acciones "
      "relacionadas por dominio de negocio. Cada panel está diseñado "
      "para una audiencia específica (CEO, equipo de marketing, riesgo, "
      "innovación) y permite drill-down desde KPI hasta agente "
      "subyacente hasta recomendación accionable.", story)

    panels = [
        ('Command Center',
         'Vista principal con KPIs ejecutivos, mapa de la República Dominicana iluminado por ciudades y agentes activos, y esfera holográfica de partículas que sintetiza la actividad del sistema. Es la pantalla de aterrizaje del CEO.',
         'CEO, comité ejecutivo'),
        ('Briefing Ejecutivo',
         'Briefing generado por LLM en vivo todos los días a las 6 AM, con top riesgos, top oportunidades, top ideas y decisiones pendientes. Una sola lectura de 5 minutos reemplaza 30 minutos de correo.',
         'CEO, directores'),
        ('Centro de Alertas',
         'Timeline priorizado de alertas con routing automático al equipo responsable. Cada alerta incluye contexto, impacto estimado, agente emisor y acción recomendada.',
         'Operación, equipos de respuesta'),
        ('Centro de Recomendaciones',
         'Decisiones accionables con rationale, impacto estimado, esfuerzo requerido y tracking de outcome. Permite cerrar el ciclo de decisión y aprender del feedback.',
         'Comité ejecutivo, producto, marketing'),
        ('Panel de Competencia',
         'Matriz comparativa RD con Banreservas, BHD, Popular, APAP, Scotia y otros, más benchmark internacional con Nubank, Revolut, Wise, Monzo y Mercado Pago. Scoreboard de movimientos competitivos.',
         'Estrategia, producto, marketing'),
        ('Panel de Marketing',
         'Viral Content, Creative Analyzer, Social Listening, Promotion Generator y Reputation AI en un solo panel. Feed de tendencias, creativos en evaluación, sentimiento y campañas activas.',
         'CMO, equipo de marketing'),
        ('Panel de Fidelización',
         '5 niveles (Bronce/Plata/Oro/Platino/Diamante) más retención, depósitos y referidos en un solo lugar. Distribución por nivel, ascensos/descensos, churn por nivel y ROI del programa.',
         'CRM, producto, growth'),
        ('Panel de Riesgo & Cobros',
         'Prevención, recuperación y funnel de mora en un solo panel. Bucket curve, score de mora esperada, planes de regularización activos y costo legal evitado.',
         'Riesgo, cobros, CFO'),
        ('Panel de Innovación',
         'Pipeline ICE, roadmap RICE, automatización y UX. Muestra el flujo de ideas desde su generación hasta su lanzamiento, con métricas de throughput y predictibilidad.',
         'Innovación, producto, ingeniería'),
    ]
    panel_rows = [
        [Paragraph('<b>Panel</b>', STY_TBL_HEAD),
         Paragraph('<b>Descripción</b>', STY_TBL_HEAD),
         Paragraph('<b>Audiencia</b>', STY_TBL_HEAD)],
    ]
    for name, desc, aud in panels:
        panel_rows.append([
            Paragraph(f'<b>{name}</b>', STY_TBL_CELL),
            Paragraph(desc, STY_TBL_CELL),
            Paragraph(aud, STY_TBL_CELL),
        ])
    panel_widths = [CONTENT_W * r for r in (0.20, 0.55, 0.25)]
    panel_tbl = make_table(panel_rows, panel_widths, header_rows=1)
    story.append(panel_tbl)
    story.append(Paragraph('Tabla 2. Los 9 paneles especializados del dashboard.',
                           STY_CAPTION))

    p("Cada panel se accede desde la barra lateral de navegación. El panel "
      "<b>Command Center</b> funciona como pantalla de aterrizaje y "
      "agrega señales de todos los demás paneles. Los paneles "
      "especializados permiten drill-down al agente individual y a la "
      "recomendación específica. El diseño está optimizado para lectura "
      "ejecutiva: la señal crítica siempre está arriba y a la izquierda, "
      "el contexto sigue, y la acción recomendada se ejecuta con un "
      "solo clic.", story)

    # ============ CHAPTER 6: ANIMACIONES ============
    h1('6. Animaciones y Experiencia Visual', story)

    p("La experiencia visual del dashboard está cuidadosamente diseñada "
      "para comunicar seriedad, velocidad y profundidad sin caer en "
      "efectos gratuitos. Tres animaciones principales estructuran la "
      "experiencia, cada una con un propósito comunicativo claro.", story)

    h2('Animación 1: Mapa de la República Dominicana', story)
    p("Un mapa SVG estilizado de la República Dominicana se ilumina "
      "progresivamente con nodos en las principales ciudades (Santo "
      "Domingo, Santiago, La Romana, Punta Cana, Samaná, San Pedro de "
      "Macorís, Puerto Plata, La Vega, San Cristóbal, Higüey). A medida "
      "que cada agente detecta una señal relevante, el nodo "
      "correspondiente se activa con un pulso luminoso. Líneas "
      "directrices conectan los nodos para representar el flujo de "
      "información entre regiones y la cobertura nacional del sistema.", story)
    p("Propósito: comunicar cobertura nacional en tiempo real y "
      "descentralizar la idea de inteligencia bancaria — no es solo "
      "Santo Domingo, es toda la República Dominicana.", story)

    h2('Animación 2: Líneas luminosas agentes → decisiones', story)
    p("Cuando un agente detecta una oportunidad o riesgo relevante, una "
      "línea luminosa se traza desde el agente hasta la tarjeta "
      "ejecutiva correspondiente en el Command Center. La línea "
      "estructura visualmente el flujo <b>problema → oportunidad → "
      "impacto → decisión</b>, mostrando cómo la señal del agente se "
      "convierte en una decisión ejecutiva concreta.", story)
    p("Propósito: hacer visible el flujo de inteligencia dentro del "
      "sistema, demostrar que cada decisión tiene un origen trazable en "
      "un agente específico.", story)

    h2('Animación 3: Esfera holográfica de partículas', story)
    p("En el Centro de Inteligencia, una esfera holográfica de "
      "partículas en canvas 3D rota lentamente. Cada pulso de luz que "
      "entra desde un agente activo genera una onda en la esfera, y la "
      "esfera sintetiza todos los pulsos en un resumen ejecutivo que "
      "se despliega como briefing en vivo. La esfera tiene 380 "
      "partículas distribuidas con patrón fibonacci, anillos rotantes "
      "y un núcleo central con glow esmeralda-cian.", story)
    p("Propósito: servir como metáfora visual de la inteligencia "
      "colectiva del sistema. No es decorativa: cada pulso representa "
      "un insight real generado por un agente en ese momento.", story)

    h2('Principios de motion design', story)
    bullets([
        "<b>Duración</b>: 200–600ms. Nada de animaciones largas que "
        "interrumpan el flujo de decisión.",
        "<b>Easing</b>: cubic-bezier(0.4, 0, 0.2, 1) por defecto. "
        "Aceleración natural, sin rebotes infantiles.",
        "<b>Propósito</b>: cada animación comunica una transición de "
        "estado o una relación causal. Nada deco.",
        "<b>Accesibilidad</b>: respeta prefers-reduced-motion.",
        "<b>Rendimiento</b>: 60fps garantizado vía canvas y transform "
        "GPU. Nada de animar propiedades costosas.",
    ], story)

    # ============ CHAPTER 7: STACK ============
    h1('7. Stack Tecnológico', story)

    p("El stack tecnológico está elegido para garantizar velocidad de "
      "desarrollo, observabilidad, escalabilidad y seguridad "
      "bancaria. Cada capa tiene una justificación específica basada "
      "en madurez, comunidad y compatibilidad con el talento disponible "
      "en el mercado dominicano.", story)

    h2('Frontend', story)
    bullets([
        "<b>React</b> + <b>Next.js 16</b>: framework de aplicación "
        "full-stack con server components, streaming SSR y edge runtime.",
        "<b>TypeScript</b>: tipado estático end-to-end.",
        "<b>Tailwind CSS</b>: utilidades de estilo consistentes.",
        "<b>shadcn/ui</b>: componentes accesibles y personalizables.",
        "<b>Framer Motion</b>: animaciones declarativas con "
        "performance óptima.",
    ], story)

    h2('Backend', story)
    bullets([
        "<b>Node.js</b> con API Routes de Next.js para endpoints "
        "ligeros y de baja latencia.",
        "<b>Python con FastAPI</b> para servicios de ML: scoring de "
        "mora, propensión a churn, modelos de propensión a producto.",
        "Modelos de ML propios: <b>XGBoost</b> y <b>Gradient Boosting</b> "
        "para scoring de mora y propensión, con explicabilidad SHAP.",
    ], story)

    h2('Datos', story)
    bullets([
        "<b>PostgreSQL</b>: base transaccional principal.",
        "<b>Redis</b>: caché, colas y sesiones.",
        "<b>Prisma ORM</b>: tipado y migraciones seguras.",
    ], story)

    h2('Capa de IA', story)
    bullets([
        "<b>OpenAI</b>, <b>Anthropic Claude</b>, <b>Google Gemini</b>: "
        "modelos de razonamiento para briefing, síntesis y generación "
        "de contenido.",
        "<b>ZAI</b> (z-ai-web-dev-sdk): SDK de IA para web search, "
        "lectura de páginas y generación, usado en agentes que "
        "requieren acceso a información pública.",
        "Modelos de ML propios para scoring bancario (mora, churn, "
        "propensión), entrenados con datos internos del banco.",
    ], story)

    h2('Infraestructura', story)
    bullets([
        "<b>Docker</b>: contenedores reproducibles para todos los "
        "servicios.",
        "<b>Supabase</b> (opcional): backend gestionado para "
        "acelerar el piloto.",
        "Monitoreo 24/7 con alertas, logs estructurados y "
        "tracing distribuido.",
    ], story)

    h2('Integraciones', story)
    bullets([
        "<b>Superintendencia de Bancos RD</b> (sb.gob.do): datos "
        "regulatorios públicos.",
        "<b>Banco Central RD</b> (BCRD): tasas, inflación, "
        "indicadores macro.",
        "<b>App Store / Google Play APIs</b>: reviews, ratings, "
        "versiones de apps competidoras.",
        "<b>Redes sociales APIs</b>: monitoreo de menciones y "
        "tendencias.",
    ], story)

    # ============ CHAPTER 8: CASO DE VALOR (KEY SECTION) ============
    h1('8. Caso de Valor: Ahorro de Costos y Optimización de Equipos', story)

    p("Esta es la sección central de la propuesta. Cada agente IA puede "
      "asumir o potenciar funciones que hoy requieren empleados "
      "especializados. <b>No se trata de reemplazar personas por "
      "reemplazar</b>: se trata de reasignar talento a tareas de mayor "
      "valor y reducir la necesidad de contrataciones adicionales a "
      "medida que el banco escala. La filosofía es <i>capacidad "
      "liberada</i>, no <i>despido</i>.", story)

    p("La tabla siguiente presenta, por cada agente, la función humana "
      "que asume o potencia, el FTE (Full-Time Equivalent) "
      "potencialmente liberado, el costo anual estimado por FTE en el "
      "sector bancario dominicano y el ahorro anual estimado. Todas las "
      "cifras son <b>estimaciones ilustrativas</b> basadas en buenas "
      "prácticas internacionales y salarios promedio del sector "
      "bancario RD; los números reales dependen de la estructura "
      "organizacional actual de Qik, que se conocería tras autorización "
      "y acceso a datos internos.", story)

    h2('Tabla de capacidad liberada por agente', story)

    fte_rows = [
        [Paragraph('<b>#</b>', STY_TBL_HEAD),
         Paragraph('<b>Agente IA</b>', STY_TBL_HEAD),
         Paragraph('<b>Función humana que asume/potencia</b>', STY_TBL_HEAD),
         Paragraph('<b>FTE</b>', STY_TBL_HEAD),
         Paragraph('<b>Ahorro anual<br/>(RD$, estimación)</b>', STY_TBL_HEAD)],
    ]
    fte_data = [
        (1,  'Competitor Intelligence AI', '2 analistas competitivos senior', 2.0, 2_400_000),
        (2,  'Viral Content AI',           '1.5 creadores de contenido junior', 1.5, 1_200_000),
        (3,  'Creative Analyzer AI',       '1 analista de creativos + agencia externa parcial', 1.5, 1_800_000),
        (4,  'Social Listening AI',        '1 community manager + 1 analista CX', 2.0, 1_400_000),
        (5,  'Referral Growth AI',         'Potencia growth manager', 1.0, 900_000),
        (6,  'Customer Retention AI',      '2 analistas CX/retención', 2.0, 1_600_000),
        (7,  'Deposit Growth AI',          'Potencia equipo de producto', 1.0, 1_100_000),
        (8,  'Loyalty & Rewards AI',       '1 gestor de programa de lealtad', 1.0, 1_200_000),
        (9,  'Smart Payment Reminder AI',  '2 cobradores + automatización de notificaciones', 2.0, 1_800_000),
        (10, 'Smart Recovery AI',          '2 gestores de recuperación + reducción costo legal', 2.0, 2_600_000),
        (11, 'Risk Prevention AI',         '1 analista de riesgo senior + mora evitada', 1.5, 3_800_000),
        (12, 'Feature Suggestion AI',      '1 product researcher', 1.0, 1_000_000),
        (13, 'Promotion Generator AI',     '1 marketing ops', 1.0, 900_000),
        (14, 'Executive Advisor AI',       '1 analista ejecutivo del CEO', 1.0, 1_500_000),
        (15, 'Dashboard Metrics AI',       '1 BI analyst', 1.0, 1_300_000),
        (16, 'UX Auditor AI',              '1 UX researcher parcial + reducción costo de agencia', 1.0, 1_400_000),
        (17, 'Banking Innovation AI',      '1 innovation lead parcial', 0.5, 900_000),
        (18, 'AI Automation Center',       '3 ops + reducción RPA externo', 3.0, 3_100_000),
        (19, 'Reputation AI',              '1 PR analyst', 1.0, 1_000_000),
        (20, 'Product Roadmap AI',         'Potencia product lead', 0.5, 800_000),
    ]
    total_savings = 0
    for num, name, fn, fte, savings in fte_data:
        total_savings += savings
        fte_rows.append([
            Paragraph(str(num), STY_TBL_CELL_C),
            Paragraph(f'<b>{name}</b>', STY_TBL_CELL),
            Paragraph(fn, STY_TBL_CELL),
            Paragraph(f'{fte:.1f}', STY_TBL_CELL_C),
            Paragraph(f'RD$ {savings:,.0f}'.replace(',', '.'), STY_TBL_CELL_R),
        ])
    # Total row
    fte_rows.append([
        Paragraph('<b>Total</b>', STY_TBL_CELL_C),
        Paragraph('<b>20 agentes</b>', STY_TBL_CELL),
        Paragraph('<b>Capacidad liberada / costo evitado anual</b>', STY_TBL_CELL),
        Paragraph(f'<b>{sum(r[3] for r in fte_data):.1f}</b>', STY_TBL_CELL_C),
        Paragraph(f'<b>RD$ {total_savings:,.0f}</b>'.replace(',', '.'), STY_TBL_CELL_R),
    ])
    fte_widths = [CONTENT_W * r for r in (0.05, 0.22, 0.45, 0.08, 0.20)]
    fte_tbl = make_table(fte_rows, fte_widths, header_rows=1)
    # Style total row
    n_rows = len(fte_rows)
    total_idx = n_rows - 1
    fte_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, total_idx), (-1, total_idx), HEADER_FILL),
        ('TEXTCOLOR', (0, total_idx), (-1, total_idx), colors.white),
        ('FONTNAME', (0, total_idx), (-1, total_idx), 'FreeSerif-Bold'),
    ]))
    story.append(fte_tbl)
    story.append(Paragraph(
        'Tabla 3. Capacidad liberada y costo evitado anual por agente IA '
        '(estimación ilustrativa, no contractual).',
        STY_CAPTION))

    disclaimer_box(
        "<b>Disclaimer sobre las estimaciones:</b> Todas las cifras de esta "
        "tabla son <b>estimaciones ilustrativas</b> basadas en buenas "
        "prácticas internacionales y salarios promedio del sector bancario "
        "dominicano. Los números reales dependen de la estructura "
        "organizacional actual de Qik, que se conocería tras autorización "
        "y acceso a datos internos. La cifra de RD$ 32.7M anual "
        "(aproximadamente USD$560K al cambio de referencia) representa "
        "<b>capacidad liberada y costos evitados</b>, no despidos directos. "
        "La filosofía del proyecto es reasignar talento a tareas de mayor "
        "valor y reducir la necesidad de contrataciones adicionales a "
        "medida que el banco escala, no reducir la plantilla existente.",
        story
    )

    h2('Modelo ROI', story)
    p("El modelo de retorno sobre la inversión compara el costo anual "
      "total del proyecto (licencia de plataforma + implementación + "
      "operación + modelos de ML) contra el ahorro estimado de "
      "capacidad liberada y costos evitados. El <b>payback típico "
      "estimado es de 6 a 9 meses</b>, considerando una implementación "
      "faseada que libera capacidad desde el mes 3.", story)

    story.append(callout_row([
        ("RD$32.7M", "Capacidad liberada / año (estim.)"),
        ("RD$3–5M",  "Costo anual estimado del proyecto (licencia + ops)"),
        ("6–9 meses", "Payback estimado"),
        ("7–10×",    "ROI a 3 años (estim.)"),
    ]))

    h2('Beneficios no financieros', story)
    p("Más allá del ROI directo, el proyecto genera beneficios "
      "estratégicos difíciles de cuantificar pero críticos para el "
      "banco:", story)
    bullets([
        "<b>Decisiones más rápidas</b>: el tiempo de reacción a "
        "movimientos competitivos y de mercado se reduce de semanas a "
        "horas.",
        "<b>Mejor experiencia del cliente</b>: detección temprana de "
        "fricción, respuesta proactiva a quejas, personalización "
        "responsable.",
        "<b>Ventaja competitiva sostenida</b>: la infraestructura de "
        "decisión es difícil de replicar por competidores sin un esfuerzo "
        "similar.",
        "<b>Escalabilidad sin contratación proporcional</b>: el banco "
        "puede crecer 2–3× en usuarios sin duplicar equipos de "
        "inteligencia, riesgo, cobros, marketing ops.",
        "<b>Cultura de decisión basada en datos</b>: cada decisión "
        "ejecutiva tiene rationale documentado, fuente trazable y "
        "outcome medido.",
    ], story)

    h2('Disclaimer regulatorio', story)
    disclaimer_box(
        "<b>Marco regulatorio:</b> Toda automatización del sistema "
        "respeta las políticas de cobranza responsable y la regulación "
        "vigente de la <b>Superintendencia de Bancos</b> de la "
        "República Dominicana (sb.gob.do), así como la <b>Ley 155-17</b> "
        "de Defensa del Consumidor y la normativa de protección de datos "
        "personales. <b>Ninguna decisión automatizada de crédito se "
        "ejecuta sin gobernanza humana</b>: los modelos predicen, los "
        "humanos aprueban. Los usuarios mantienen el derecho a "
        "explicación de cualquier decisión que los afecte. Los "
        "modelos de ML están sujetos a gobernanza MRM (Model Risk "
        "Management) con backtesting, champion/challenger y monitoreo "
        "continuo de drift.",
        story
    )

    # Mini bar chart of top 5 savings
    h2('Visualización: top 5 agentes por capacidad liberada', story)
    top5 = sorted(fte_data, key=lambda r: r[4], reverse=True)[:5]
    bar_data = [r[4] / 1_000_000 for r in top5]  # in millions
    bar_labels = [r[1].replace(' AI', '').replace('Center', 'Center')[:30] for r in top5]
    bar_chart = MiniBarChart(bar_data, bar_labels, width=CONTENT_W * 0.92,
                             height=110, bar_color=ACCENT)
    story.append(bar_chart)
    story.append(Paragraph(
        'Gráfico 1. Top 5 agentes por capacidad liberada anual estimada '
        '(RD$ millones).',
        STY_CAPTION))

    # ============ CHAPTER 9: CRÍTICA HONESTA ============
    h1('9. Crítica Honesta — Comité de Inversión', story)

    p("Esta sección presenta, con honestidad intelectual, lo que "
      "<b>FALTA</b> para que un CEO y un comité de inversión digan que "
      "el sistema <i>aporta valor real</i> y no es solo una demo "
      "estéticamente impresionante. La transparencia sobre los gaps es "
      "la prueba más fuerte de la seriedad del proyecto.", story)

    h2('1. Datos reales conectados (no simulados)', story)
    p("El sistema debe integrarse al <b>core bancario</b>, al CRM, a "
      "los analytics de la app y a los sistemas de cobros y riesgo. "
      "Sin datos reales, los agentes razonan sobre supuestos y las "
      "recomendaciones no son accionables. Esta integración es el "
      "primer entregable del piloto de 90 días.", story)

    h2('2. Modelos validados', story)
    p("Los modelos de ML (scoring de mora, propensión a churn, "
      "propensión a producto) deben pasar <b>backtesting</b> "
      "riguroso sobre histórico, validación <b>champion/challenger</b> "
      "en producción, y gobernanza MRM con SHAP para explicabilidad. "
      "Un modelo sin backtesting es una opinión con matemáticas.", story)

    h2('3. Ciclo cerrado de decisión', story)
    p("Cada recomendación debe tener un <b>workflow de aprobación</b>, "
      "<b>tracking de outcome</b> y <b>feedback loop</b> que permita "
      "aprender. Sin ciclo cerrado, el sistema genera "
      "recomendaciones pero nadie sabe cuáles funcionaron. El panel "
      "<i>Centro de Recomendaciones</i> es el hogar de este ciclo.", story)

    h2('4. Cumplimiento regulatorio explícito', story)
    p("La Superintendencia de Bancos, la Ley 155-17 de Defensa del "
      "Consumidor y la normativa de protección de datos deben estar "
      "explícitamente mapeadas a cada agente y cada automatización. "
      "El <b>derecho a explicación</b> debe estar implementado "
      "técnicamente (SHAP + narrativa LLM).", story)

    h2('5. Coste unitario de los agentes (unit economics)', story)
    p("Cada insight tiene un costo: tokens LLM, cómputo ML, "
      "almacenamiento, ancho de banda. El sistema debe medir el "
      "<b>costo por insight</b> y el <b>valor por insight</b>, y "
      "asegurar que el ratio sea positivo. Sin unit economics, el "
      "sistema puede ser insostenible a escala.", story)

    h2('6. Datos externos que importan en RD', story)
    p("Más allá del BCRD y la SB, el sistema debe integrar datos "
      "específicos del mercado dominicano: <b>remesas</b> (parte "
      "sustancial del PIB), <b>telefonía</b> (penetración móvil), "
      "<b>electrificación</b> (para productos rurales) y datos "
      "demográficos del ONE. Estos datos contextuales son críticos "
      "para que los agentes no razonen como si estuvieran en un "
      "mercado genérico.", story)

    h2('7. Roadmap de adopción interna', story)
    p("El sistema solo aporta valor si los ejecutivos lo usan. El "
      "roadmap debe pasar por: <b>piloto controlado</b> (3 directores) "
      "→ <b>comité ejecutivo</b> (CEO + directores) → <b>rollout "
      "gradual</b> al resto de la organización. Sin adopción, la "
      "plataforma es software muerto. La adopción no es opcional ni "
      "automática: se diseña, se mide y se incentiva.", story)

    # ============ CHAPTER 10: ROADMAP ============
    h1('10. Roadmap de Implementación (90 días)', story)

    p("El roadmap de implementación está diseñado para entregar valor "
      "medible en 90 días, no para construir el sistema perfecto. Cada "
      "mes tiene un entregable concreto y un criterio de éxito "
      "objetivo. La meta del día 90 es que el comité ejecutivo pueda "
      "tomar al menos una decisión estratégica basada en el sistema "
      "y medir su outcome.", story)

    h2('Mes 1: Integración y validación', story)
    bullets([
        "Integración con <b>3 fuentes de datos reales</b> del banco "
        "(core bancario read-only, CRM, app analytics).",
        "Validación de <b>1 modelo (mora)</b> contra histórico de "
        "24 meses, con backtesting y métricas de calibración.",
        "Despliegue del dashboard base con los 20 agentes en modo "
        "lectura (sin automatizaciones).",
        "Criterio de éxito: el modelo de mora tiene AUC ≥ 0.75 en "
        "backtesting y el dashboard muestra datos reales.",
    ], story)

    h2('Mes 2: Workflow y piloto', story)
    bullets([
        "Implementación del <b>workflow de aprobación</b> de "
        "recomendaciones con tracking de outcome.",
        "<b>Feedback loop</b>: el sistema aprende de decisiones "
        "aprobadas/rechazadas y sus resultados.",
        "Piloto con <b>3 directores</b> (producto, riesgo, marketing) "
        "con daily standup de 15 min sobre el briefing.",
        "Criterio de éxito: al menos 10 recomendaciones aprobadas con "
        "outcome medido al final del mes.",
    ], story)

    h2('Mes 3: Expansión y medición', story)
    bullets([
        "Expansión al <b>comité ejecutivo</b> (CEO + todos los "
        "directores) con el briefing diario como rutina.",
        "Activación de automatizaciones de bajo riesgo (recordatorios "
        "de pago, alertas competitivas).",
        "<b>Medición de ROI real vs. estimado</b>: comparar capacidad "
        "liberada real contra la tabla del capítulo 8.",
        "Criterio de éxito: ROI medido al final del mes 3 con "
        "evidencia cuantitativa de capacidad liberada.",
    ], story)

    h2('Entregables del día 90', story)
    bullets([
        "Dashboard funcional con 20 agentes y datos reales conectados.",
        "1 modelo (mora) validado y en producción con gobernanza MRM.",
        "Workflow de aprobación + feedback loop operativo.",
        "Comité ejecutivo usando el briefing diario como rutina.",
        "Reporte de ROI real vs. estimado con aprendizajes para la "
        "fase de escalamiento.",
    ], story)

    # ============ CHAPTER 11: PRÓXIMOS PASOS ============
    h1('11. Próximos Pasos', story)

    p("Para que el proyecto avance desde esta propuesta hasta un "
      "piloto funcional en 90 días, se requiere autorización y "
      "acceso por parte de Qik a cuatro frentes. Sin estos cuatro "
      "accesos, no es posible calibrar los agentes con datos reales "
      "ni validar el ROI estimado.", story)

    h2('Accesos requeridos de Qik', story)
    bullets([
        "<b>Datos anonimizados de transaccionalidad y comportamiento</b> "
        "(últimos 24 meses) para entrenar y validar modelos.",
        "<b>Acceso a equipos de producto, riesgo, marketing y CX</b> "
        "para entrevistas de discovery (4–6 sesiones de 90 min).",
        "<b>API access al core bancario y CRM</b> (read-only inicial) "
        "para integración con el dashboard.",
        "<b>Validación de supuestos regulatorios</b> con el equipo de "
        "compliance (1 sesión con legal/compliance).",
    ], story)

    h2('Entregables que se pueden lograr con estos accesos', story)
    bullets([
        "<b>Calibrar los 20 agentes con datos reales</b>, ajustando "
        "umbrales, prompts y modelos al contexto específico de Qik.",
        "<b>Validar el ROI estimado</b> con cifras reales, refinando "
        "la tabla del capítulo 8 a la estructura organizacional "
        "actual del banco.",
        "<b>Personalizar el dashboard al contexto exacto de Qik</b>: "
        "KPIs propios, segmentos propios, productos propios, "
        "competidores priorizados.",
        "<b>Entregar un piloto funcional en 90 días</b> con el modelo "
        "de mora validado, el workflow de aprobación operativo y el "
        "comité ejecutivo usando el briefing diario.",
    ], story)

    h2('Compromiso del equipo del proyecto', story)
    p("El equipo del proyecto se compromete a: transparencia total "
      "sobre el avance semanal, métricas objetivas de éxito, "
      "documentación de cada decisión técnica, y entrega del piloto "
      "funcional al día 90 con reporte ejecutivo de ROI real vs. "
      "estimado. Si las métricas objetivo no se alcanzan, se "
      "documenta el gap y se propone plan de remediación, sin maquillaje.", story)

    # ============ CHAPTER 12: CIERRE ============
    h1('12. Cierre', story)

    p("QIK AI COMMAND CENTER no es un gasto. Es la <b>infraestructura "
      "de decisión</b> que prepara a Qik para liderar la próxima "
      "década de la banca digital dominicana.", story)

    story.append(Spacer(1, 6))
    story.append(Paragraph(
        '"QIK AI COMMAND CENTER no es un gasto. Es la infraestructura '
        'de decisión que prepara a Qik para liderar la próxima década '
        'de la banca digital dominicana."',
        STY_QUOTE))
    story.append(Spacer(1, 6))

    p("El sistema bancario dominicano está entrando en una fase de "
      "competencia intensa por experiencia, velocidad y costo. Qik, "
      "como primer neobanco del país con respaldo del Grupo Popular, "
      "tiene una posición única para capturar la próxima década de "
      "crecimiento — pero solo si opera como una organización de "
      "decisión acelerada por IA. Esta propuesta es el blueprint para "
      "esa transformación.", story)

    p("Los próximos 90 días definen si el sistema pasa de propuesta "
      "a infraestructura viva del banco. La invitación es a autorizar "
      "el proyecto, dar los accesos requeridos y empezar la "
      "integración con datos reales. El equipo está listo.", story)

    h2('Contacto', story)
    p("Para avanzar con la autorización del proyecto, coordinar las "
      "entrevistas de discovery o resolver dudas técnicas, el equipo "
      "del proyecto está disponible. La propuesta se entrega con la "
      "documentación completa y el acceso al dashboard demo en vivo "
      "para que el comité ejecutivo pueda explorarlo de primera mano.", story)

    story.append(Spacer(1, 18))
    story.append(HRFlowable(width=CONTENT_W, thickness=1.2, color=ACCENT,
                            spaceBefore=2, spaceAfter=10, hAlign='CENTER'))
    p("<b>QIK AI COMMAND CENTER</b> · Propuesta Ejecutiva · "
      "República Dominicana, 2025 · Edición 01.",
      story, _style('Closing', fontSize=9.5, leading=13,
                    alignment=TA_CENTER, textColor=TEXT_MUTED))

    return story


def main():
    output_path = '/home/z/my-project/scripts/pdf-build/body.pdf'
    doc = TocDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=LEFT_MARGIN,
        rightMargin=RIGHT_MARGIN,
        topMargin=TOP_MARGIN,
        bottomMargin=BOTTOM_MARGIN,
        title='QIK AI COMMAND CENTER — Propuesta Ejecutiva',
        author='Qik AI Command Center',
        creator='Z.ai',
        subject='Sistema de Inteligencia Artificial para el Banco Digital Qik',
    )
    story = build_story()
    doc.multiBuild(story, onFirstPage=draw_header_footer,
                   onLaterPages=draw_header_footer)
    print(f"[ok] Body PDF generated: {output_path}")


if __name__ == '__main__':
    main()
