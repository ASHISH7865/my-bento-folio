'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertTriangle, Info, AlertCircle, Lightbulb, ExternalLink, Play, Copy, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from 'next-themes'

interface LexicalTextNode {
  type: 'text'
  text: string
  format?: number
}

interface LexicalElementNode {
  type: string
  tag?: number
  listType?: 'number' | 'bullet'
  children?: LexicalNode[]
  language?: string
  url?: string
  newTab?: boolean
  [key: string]: unknown
}

interface LexicalBlockNode {
  type: 'block'
  fields: {
    blockType: string
    [key: string]: unknown
  }
}

type LexicalNode = LexicalTextNode | LexicalElementNode | LexicalBlockNode

interface LexicalContent {
  root: {
    children: LexicalNode[]
    [key: string]: unknown
  }
  [key: string]: unknown
}

interface BlogContentRendererProps {
  content: LexicalContent | null | undefined
}

// Enhanced Code Block Component
const CodeBlock = ({ code, language, title, showLineNumbers = true }: {
  code: string
  language?: string
  title?: string
  showLineNumbers?: boolean
}) => {
  const [copied, setCopied] = React.useState(false)
  const { theme } = useTheme()

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group my-8 overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-6 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            {title || (language ? language.toUpperCase() : 'Code')}
          </span>
          {language && (
            <Badge variant="outline" className="text-xs">
              {language}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={copyToClipboard}
          >
            {copied ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <div className="flex space-x-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/80"></div>
          </div>
        </div>
      </div>
      <div className="relative">
        <SyntaxHighlighter
          language={language || 'text'}
          style={oneDark }
          showLineNumbers={showLineNumbers}
          fontFamily="JetBrains Mono"
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            // background: 'transparent',
            fontSize: '0.9rem',
            lineHeight: '1.5',
          }}
          lineNumberStyle={{
            minWidth: '3rem',
            paddingRight: '1rem',
            color: 'var(--muted-foreground)',
            userSelect: 'none',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

// Callout Component
const Callout = ({ type, title, children }: {
  type: 'info' | 'warning' | 'error' | 'success' | 'tip'
  title?: string
  children: React.ReactNode
}) => {
  const getCalloutStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          className: 'border-yellow-500/20 bg-yellow-500/5 text-yellow-700 dark:text-yellow-300',
          iconColor: 'text-yellow-500',
        }
      case 'error':
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          className: 'border-red-500/20 bg-red-500/5 text-red-700 dark:text-red-300',
          iconColor: 'text-red-500',
        }
      case 'success':
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          className: 'border-green-500/20 bg-green-500/5 text-green-700 dark:text-green-300',
          iconColor: 'text-green-500',
        }
      case 'tip':
        return {
          icon: <Lightbulb className="h-5 w-5" />,
          className: 'border-purple-500/20 bg-purple-500/5 text-purple-700 dark:text-purple-300',
          iconColor: 'text-purple-500',
        }
      default:
        return {
          icon: <Info className="h-5 w-5" />,
          className: 'border-blue-500/20 bg-blue-500/5 text-blue-700 dark:text-blue-300',
          iconColor: 'text-blue-500',
        }
    }
  }

  const styles = getCalloutStyles(type)

  return (
    <div className={`my-6 rounded-lg border p-4 ${styles.className}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${styles.iconColor}`}>
          {styles.icon}
        </div>
        <div className="flex-1">
          {title && (
            <div className="font-semibold mb-2">{title}</div>
          )}
          <div className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// Embed Component
const EmbedComponent = ({ type, url, title, width = '100%', height = '400px' }: {
  type: 'youtube' | 'codepen' | 'jsfiddle' | 'replit' | 'gist' | 'twitter' | 'custom'
  url: string
  title?: string
  width?: string
  height?: string
}) => {
  const getEmbedUrl = (type: string, url: string) => {
    switch (type) {
      case 'youtube':
        const youtubeId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
        return `https://www.youtube.com/embed/${youtubeId}`
      case 'codepen':
        return url.replace('/pen/', '/embed/')
      case 'jsfiddle':
        return `${url}/embedded/`
      case 'replit':
        return `${url}?embed=true`
      default:
        return url
    }
  }

  const embedUrl = getEmbedUrl(type, url)

  return (
    <div className="my-8">
      {title && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            {title}
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </h4>
        </div>
      )}
      <div className="overflow-hidden rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
        <iframe
          src={embedUrl}
          width={width}
          height={height}
          className="w-full"
          frameBorder="0"
          allowFullScreen
          title={title || 'Embedded Content'}
        />
      </div>
    </div>
  )
}

// Two Column Layout Component
const TwoColumnLayout = ({ leftColumn, rightColumn }: {
  leftColumn: React.ReactNode
  rightColumn: React.ReactNode
}) => {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="prose prose-sm max-w-none">
        {leftColumn}
      </div>
      <div className="prose prose-sm max-w-none">
        {rightColumn}
      </div>
    </div>
  )
}

// Enhanced content rendering function with support for all block types
function renderLexicalContent(content: LexicalContent | null | undefined): React.ReactNode {
  if (!content || !content.root || !content.root.children) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <Eye className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No content available</p>
        </div>
      </div>
    )
  }

  const renderNode = (node: LexicalNode, index: number): React.ReactNode => {
    // Handle block nodes (custom blocks)
    if (node.type === 'block') {
      const blockNode = node as LexicalBlockNode
      const { blockType, ...fields } = blockNode.fields

      switch (blockType) {
        case 'codePlayground':
          return (
            <div key={index} className="my-8">
              <CodeBlock
                code={fields.code as string}
                language={fields.language as string}
                title={fields.title as string}
                showLineNumbers={fields.showLineNumbers as boolean}
              />
              {(fields.runnable as boolean) && (
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Play className="h-4 w-4" />
                    Run Code
                  </Button>
                </div>
              )}
            </div>
          )
        case 'callout':
          return (
            <Callout
              key={index}
              type={fields.type as 'info' | 'warning' | 'error' | 'success' | 'tip'}
              title={fields.title as string}
            >
              {renderLexicalContent(fields.content as LexicalContent)}
            </Callout>
          )
        case 'embed':
          return (
            <EmbedComponent
              key={index}
              type={fields.type as 'youtube' | 'codepen' | 'jsfiddle' | 'replit' | 'gist' | 'twitter' | 'custom'}
              url={fields.url as string}
              title={fields.title as string}
              width={fields.width as string}
              height={fields.height as string}
            />
          )
        case 'twoColumn':
          return (
            <TwoColumnLayout
              key={index}
              leftColumn={renderLexicalContent(fields.leftColumn as LexicalContent)}
              rightColumn={renderLexicalContent(fields.rightColumn as LexicalContent)}
            />
          )
        default:
          return null
      }
    }

    // Handle regular lexical nodes
    switch (node.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-6 text-lg leading-relaxed text-foreground/90 tracking-wide">
            {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
          </p>
        )
      case 'heading':
        const headingLevel = (node as LexicalElementNode).tag || 2
        if (headingLevel === 1) {
          return (
            <h1 key={index} className="group mb-8 mt-16 text-4xl font-bold text-foreground first:mt-0 relative scroll-mt-20" id={`heading-${index}`}>
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
              </span>
              <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-primary to-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </h1>
          )
        } else if (headingLevel === 2) {
          return (
            <h2 key={index} className="group mb-6 mt-12 text-3xl font-bold text-foreground first:mt-0 relative scroll-mt-20" id={`heading-${index}`}>
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
              </span>
              <div className="absolute -left-3 top-0 h-full w-0.5 bg-primary/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </h2>
          )
        } else if (headingLevel === 3) {
          return (
            <h3 key={index} className="mb-4 mt-10 text-2xl font-semibold text-foreground first:mt-0 scroll-mt-20" id={`heading-${index}`}>
              {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
            </h3>
          )
        } else {
          return (
            <h4 key={index} className="mb-4 mt-8 text-xl font-medium text-foreground first:mt-0 scroll-mt-20" id={`heading-${index}`}>
              {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
            </h4>
          )
        }
      case 'text':
        const textNode = node as LexicalTextNode
        let className = 'text-foreground/90'
        if (textNode.format && textNode.format & 1) className += ' font-semibold' // Bold
        if (textNode.format && textNode.format & 2) className += ' italic' // Italic
        if (textNode.format && textNode.format & 8) className += ' underline decoration-primary/50 underline-offset-4' // Underline
        if (textNode.format && textNode.format & 16) className += ' line-through' // Strikethrough

        return (
          <span key={index} className={className}>
            {textNode.text}
          </span>
        )
      case 'code':
        const codeText = (node as LexicalElementNode).children?.map((child: LexicalNode) =>
          child.type === 'text' ? (child as LexicalTextNode).text : ''
        ).join('') || ''

        return (
          <code key={index} className="group relative rounded-lg bg-muted/80 px-3 py-1.5 font-mono text-sm text-primary border border-border/50 backdrop-blur-sm hover:bg-muted transition-all duration-200">
            {codeText}
            <span className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </code>
        )
      case 'codeblock':
        const codeBlockText = (node as LexicalElementNode).children?.map((child: LexicalNode) =>
          child.type === 'text' ? (child as LexicalTextNode).text : ''
        ).join('') || ''

        return (
          <CodeBlock
            key={index}
            code={codeBlockText}
            language={(node as LexicalElementNode).language}
            showLineNumbers={true}
          />
        )
      case 'quote':
        return (
          <blockquote key={index} className="group relative my-8 border-l-4 border-primary/60 bg-gradient-to-r from-muted/40 to-muted/20 pl-8 py-6 italic text-foreground/90 rounded-r-lg backdrop-blur-sm">
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-primary/20 rounded-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
            <div className="relative z-10">
              {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
            </div>
            <div className="absolute top-4 left-4 text-4xl text-primary/20 font-serif">&ldquo;</div>
          </blockquote>
        )
      case 'list':
        const listNode = node as LexicalElementNode
        const ListTag = listNode.listType === 'number' ? 'ol' : 'ul'
        return (
          <ListTag key={index} className="mb-8 ml-6 space-y-3 text-foreground/90">
            {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
          </ListTag>
        )
      case 'listitem':
        return (
          <li key={index} className="relative text-foreground/90 pl-2">
            <div className="absolute -left-6 top-2 h-2 w-2 rounded-full bg-primary/60" />
            {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
          </li>
        )
      case 'link':
        const linkNode = node as LexicalElementNode
        return (
          <a
            key={index}
            href={linkNode.url as string}
            className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/50 hover:decoration-primary/80 transition-colors duration-200"
            target={linkNode.newTab ? '_blank' : undefined}
            rel={linkNode.newTab ? 'noopener noreferrer' : undefined}
          >
            {linkNode.children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
          </a>
        )
      case 'horizontalrule':
        return (
          <hr key={index} className="my-12 border-none h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        )
      default:
        return (
          <div key={index}>
            {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
          </div>
        )
    }
  }

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {content.root.children.map((node: LexicalNode, index: number) => renderNode(node, index))}
    </div>
  )
}

export default function BlogContentRenderer({ content }: BlogContentRendererProps) {
  return <>{renderLexicalContent(content)}</>
}
