<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8"/>

    <xsl:template match="/">
        <table>
            <tr>
                <th>Тип</th>
                <th>Назва</th>
                <th>Калорійність</th>
                <th>Інгредієнти</th>
            </tr>
            <xsl:for-each select="cookbook/dish">
                <xsl:sort select="translate(calories, ' ккал', '')" data-type="number" order="ascending"/>
                <tr>
                    <td><xsl:value-of select="type"/></td>
                    <td><xsl:value-of select="name"/></td>
                    <td><xsl:value-of select="calories"/></td>
                    <td>
                        <xsl:for-each select="ingredients/ingredient">
                            <xsl:value-of select="name"/> (<xsl:value-of select="amount"/>)
                            <xsl:if test="position() != last()">, </xsl:if>
                        </xsl:for-each>
                    </td>
                </tr>
            </xsl:for-each>
        </table>
    </xsl:template>
</xsl:stylesheet>
